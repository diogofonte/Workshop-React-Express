import React, { useState, useEffect } from "react";
import { Grid, Typography } from "@mui/material";
import { TodoCard } from "../components/TodoCard";
import { Item, itemStates } from "../model/Item";
import { setDone } from "../controller/todoItems";

const styles = {
    container: {
        padding: "1rem",
        height: "100%",
        backgroundColor: "lightBlue",
        boxSizing: "border-box",
    },
    column: {
        width: "85%",
        margin: "auto",
        backgroundColor: "lightGrey",
        padding: "2rem",
        borderRadius: "1rem",
        minHeight: "50vh",
    },
};

// Optional TODO: Make The App pretty *-*

/* Optional TODO: Create an app global state (redux) containing a 'loading' flag. 
While backend requests are being processed, show the loading indicator in the UI */

export const HomePage = () => {
    const [items, setItems] = useState([]);

    const getTodos = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/todo`, {
                method: "GET",
            });
            if (!response.ok) {
                // Any HTTP status non 2xx will make ok = false
            }
            // If the response is JSON, call .json() which returns a Promise
            const json = await response.json();
            const parsedJson = json.map(item => new Item(item.text, item.state, item.key));
            setItems(parsedJson);
        } catch (error) {
            // Handle Network Error
        }
    }

    useEffect(() => {
        getTodos();
    }, []);

    const handleDone = async (item) => {
        const result = await setDone(item);

        if (!result.ok) {
            // Failed request
            console.log("Error setting item to done.", result);
            return;
        }

        // Updating state to Done in the UI
        const newItems = items.map((currItem) => {
            if (currItem.id === item.id) currItem.state = itemStates.done;
            return currItem;
        });
        setItems(newItems);
    };

    const handleDelete = async (item) => {
        const result = await setDone(item);

        if (!result.ok) {
            // Failed request
            console.log("Error deleting item.");
            return;
        }

        // Updating state to Done in the UI
        const newItems = items.map((currItem) => {
            if (currItem.id === item.id) currItem.state = itemStates.done;
            return currItem;
        });
        setItems(newItems);
    };

    return (
        <div style={styles.container}>
            <h1>To do List</h1>
            <Grid container padding={2}>
                <Grid item xs={12} md={6} style={styles.grid} paddingBottom={3}>
                    <div style={styles.column}>
                        <Typography variant="h2">Todo</Typography>

                        <TodoCard
                            title="TODO"
                            items={
                                items.filter(item => item.state == "TODO")
                            }
                            handleDone={handleDone}
                            handleDelete={handleDelete}
                        />
                    </div>
                </Grid>

                <Grid item xs={12} md={6}>
                    <div style={styles.column}>
                        <Typography variant="h2">Done</Typography>
                        
                        <TodoCard
                            title="DONE"
                            items={
                                items.filter(item => item.state == "DONE")
                            }
                            handleDone={handleDone}
                            handleDelete={handleDelete}
                        />
                    </div>
                </Grid>
            </Grid>
        </div>
    );
};
