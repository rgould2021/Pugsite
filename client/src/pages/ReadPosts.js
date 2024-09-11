import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Card from '../components/Card';
import { supabase } from '../client';

const ReadPosts = () => {
    const [posts, setPosts] = useState([]);
    const [filteredPosts, setFilteredPosts] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [applyFilter, setApplyFilter] = useState(false);
    const [sortCriteria, setSortCriteria] = useState('created_at');

    useEffect(() => {
        const fetchPosts = async () => {
            const { data, error } = await supabase.from('Posts').select('id, title, author, description, image, created_at, betCount');
            if (error) {
                console.error('Error fetching posts:', error.message);
                return;
            }
            setPosts(data);
            setFilteredPosts(data);
        };

        fetchPosts();
    }, []);

    useEffect(() => {
        applyFilters();
    }, [searchQuery, applyFilter, sortCriteria]);

    const applyFilters = () => {
        let filtered = [...posts];

        if (applyFilter) {
            filtered = filtered.filter(post => post.title.toLowerCase().includes(searchQuery.toLowerCase()));
        }

        if (sortCriteria === 'created_at') {
            filtered.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        } else if (sortCriteria === 'likes') {
            filtered.sort((a, b) => b.betCount - a.betCount);
        }

        setFilteredPosts(filtered);
    };

    const handleSearch = (event) => {
        const query = event.target.value;
        setSearchQuery(query);
    };

    const handleApplyFilterChange = (event) => {
        setApplyFilter(event.target.checked);
    };

    const handleSortChange = (event) => {
        setSortCriteria(event.target.value);
    };

    return (
        <div className="container mt-4">
            <div className="filter-options mb-3">
                <label className="form-check-label">
                    <input type="checkbox" checked={applyFilter} onChange={handleApplyFilterChange} className="form-check-input" />
                    Apply Filter
                </label>
                <select className="form-select mt-2" value={sortCriteria} onChange={handleSortChange}>
                    <option value="created_at">Sort by Created Time</option>
                    <option value="likes">Sort by Likes</option>
                </select>
            </div>
            <input
                type="text"
                className="form-control mb-3"
                placeholder="Search by title..."
                value={searchQuery}
                onChange={handleSearch}
                disabled={!applyFilter} // Disable search when filter is not applied
            />

            {filteredPosts.map((post) => (
                <Link key={post.id} to={`/post/${post.id}`} className="text-decoration-none">
                    <Card
                        id={post.id}
                        title={post.title}
                        author={post.author}
                        description={post.description}
                        image={post.image}
                        created_at={post.created_at}
                        likes={post.betCount}
                    />
                </Link>
            ))}
        </div>
    );
};

export default ReadPosts;
