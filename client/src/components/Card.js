import React, { useState, useEffect } from 'react';
import { Card as BootstrapCard, Button } from 'react-bootstrap';
import { supabase } from '../client';
import './Card.css';  // Import custom CSS for Card

const Card = (props) => {
    const [count, setCount] = useState(props.likes || 0);

    useEffect(() => {
        const storedCount = localStorage.getItem(`betCount_${props.id}`);
        if (storedCount) {
            setCount(parseInt(storedCount));
        }
    }, [props.id]);

    const updateCount = async (event) => {
        event.preventDefault();
        const updatedCount = count + 1;
        setCount(updatedCount);

        try {
            const { error } = await supabase
                .from('Posts')
                .update({ betCount: updatedCount })
                .eq('id', props.id);

            if (error) {
                throw error;
            }

            localStorage.setItem(`betCount_${props.id}`, updatedCount.toString());
        } catch (error) {
            console.error('Error updating bet count:', error.message);
            setCount(count);
        }
    };

    return (
        <BootstrapCard className="card mb-3">
            {props.image && <BootstrapCard.Img variant="top" src={props.image} className="card-img" />}
            <BootstrapCard.Body>
                <BootstrapCard.Title>{props.title}</BootstrapCard.Title>
                <BootstrapCard.Subtitle className="mb-2 text-muted">by {props.author}</BootstrapCard.Subtitle>
                <BootstrapCard.Text>{props.description}</BootstrapCard.Text>
                {props.created_at && (
                    <BootstrapCard.Text className="text-muted">
                        Created at: {new Date(props.created_at).toLocaleString()}
                    </BootstrapCard.Text>
                )}
                <Button variant="primary" onClick={updateCount}>
                    👍 Likes: {count}
                </Button>
            </BootstrapCard.Body>
        </BootstrapCard>
    );
};

export default Card;
