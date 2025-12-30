'use client'; 

import React, { useEffect, useState } from 'react';
import { useBookmarkStore } from '@/stores/bookmarkStore';
import { getCompanionsByIds } from '@/lib/actions/companion.action'; 
import CompanionCard from './CompanionCard'; 
import { getSubjectColor } from '@/lib/utils';

const BookmarkedCompanions = () => {
    const bookmarkedIds = useBookmarkStore((state) => state.bookmarkedIds);
    const [companions, setCompanions] = useState<Companion[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchCompanions = async () => {
            if (bookmarkedIds.length > 0) {
                try {
                    setIsLoading(true);
                    const fetchedCompanions = await getCompanionsByIds(bookmarkedIds);
                    setCompanions(fetchedCompanions);
                    console.log(companions)
                } catch (err:unknown) {
                    console.error("Failed to fetch bookmarked companions:", err);
                    setError(err); // Or a more user-friendly error message
                } finally {
                    setIsLoading(false);
                }
            } else {
                setCompanions([]);
                setIsLoading(false);
            }
        };

        fetchCompanions();
    }, [bookmarkedIds]); // Re-fetch whenever bookmarkedIds change

    if (isLoading) {
        return <p>Loading bookmarked companions...</p>;
    }

    if (error) {
        return <p>Error loading companions: {error.message}</p>;
    }

    if (companions.length === 0) {
        return <p>No companions bookmarked yet.</p>;
    }

    return (
        <div className="companions-grid">
            {companions.map((companion) => (
                <CompanionCard key={companion.id} {...companion} color={getSubjectColor(companion.subject)} />
            ))}
        </div>
    );
};

export default BookmarkedCompanions;