from sqlalchemy.orm import Session
from sqlalchemy import and_, or_, func
from typing import List
import re
from datetime import datetime, timedelta

from models import ItemFound, ItemLost, Match

class MatchingService:
    def __init__(self):
        pass
    
    async def find_matches(self, db: Session, lost_item_id: str) -> List[Match]:
        """Find potential matches for a lost item using keyword matching"""
        lost_item = db.query(ItemLost).filter(ItemLost.id == lost_item_id).first()
        if not lost_item:
            return []
        
        # Get candidate found items (same category if possible, within last 30 days)
        candidates_query = db.query(ItemFound).filter(
            ItemFound.status == "available",
            ItemFound.found_at >= lost_item.last_seen_at - timedelta(days=30)
        )
        
        candidates = candidates_query.all()
        matches = []
        
        for found_item in candidates:
            score = self._calculate_similarity_score(lost_item, found_item)
            if score > 0.3:  # Threshold for suggesting matches
                # Check if match already exists
                existing_match = db.query(Match).filter(
                    and_(Match.lost_id == lost_item_id, Match.found_id == found_item.id)
                ).first()
                
                if not existing_match:
                    match = Match(
                        lost_id=lost_item_id,
                        found_id=found_item.id,
                        score=score,
                        auto_suggested=True
                    )
                    db.add(match)
                    matches.append(match)
        
        db.commit()
        return sorted(matches, key=lambda x: x.score, reverse=True)
    
    def _calculate_similarity_score(self, lost_item: ItemLost, found_item: ItemFound) -> float:
        """Calculate similarity score between lost and found items"""
        score = 0.0
        
        # Text similarity (simple keyword matching)
        text_sim = self._text_similarity(
            lost_item.title + " " + lost_item.description,
            found_item.title + " " + found_item.description
        )
        score += 0.6 * text_sim
        
        # Location proximity (same building gets bonus)
        if lost_item.last_seen_location_id == found_item.location_id:
            score += 0.2
        
        # Time proximity (closer in time gets bonus)
        time_diff = abs((found_item.found_at - lost_item.last_seen_at).days)
        if time_diff <= 1:
            score += 0.2
        elif time_diff <= 7:
            score += 0.1
        
        return min(score, 1.0)
    
    def _text_similarity(self, text1: str, text2: str) -> float:
        """Simple text similarity using common words"""
        # Normalize text
        words1 = set(re.findall(r'\w+', text1.lower()))
        words2 = set(re.findall(r'\w+', text2.lower()))
        
        # Remove common stop words
        stop_words = {'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by'}
        words1 = words1 - stop_words
        words2 = words2 - stop_words
        
        if not words1 or not words2:
            return 0.0
        
        # Calculate Jaccard similarity
        intersection = len(words1.intersection(words2))
        union = len(words1.union(words2))
        
        return intersection / union if union > 0 else 0.0
    
    async def get_matches_for_lost_item(self, db: Session, lost_item_id: str) -> List[Match]:
        """Get all matches for a lost item"""
        return db.query(Match).filter(Match.lost_id == lost_item_id).order_by(Match.score.desc()).all()