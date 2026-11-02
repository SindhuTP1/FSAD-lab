
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API = "http://localhost:8000";

// Display Inventory
function Display_Inventory({ inventory }) {

    return (
        <div>
            <h1>Inventory Management</h1>

            <table border="1" cellPadding="10">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Product Name</th>
                        <th>Quantity</th>
                        <th>Price</th>
                    </tr>
                </thead>

                <tbody>
                    {inventory.map((item) => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.prodname}</td>
                            <td>{item.qty}</td>
                            <td>{item.price}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}


// Add Inventory
function AddInventory({ refreshInventory }) {

    const [id, setId] = useState("");
    const [name, setName] = useState("");
    const [qty, setQty] = useState("");
    const [price, setPrice] = useState("");

    // Submit Event
    const SubmitEvent = async (e) => {

        e.preventDefault();

        const fo = {
            id: Number(id),
            prodname: name,
            qty: Number(qty),
            price: Number(price)
        };

        try {

            const response = await axios.post(
                `${API}/add`,
                fo,
                {
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            );

            console.log("POST Response:", response.data);

            await refreshInventory();

            alert("Inventory Added Successfully!");

            setId("");
            setName("");
            setQty("");
            setPrice("");

        } catch (error) {

            console.error(
                "POST Error:",
                error.response?.data || error.message
            );

            alert(
                "Error adding inventory: " +
                (error.response?.data?.message || error.message)
            );
        }
    };

    return (
        <div>
            <h1>Inventory Management - Add</h1>

            <form onSubmit={SubmitEvent}>

                <table border="1" cellPadding="10">
                    <tbody>

                        <tr>
                            <td>ID</td>
                            <td>
                                <input
                                    type="number"
                                    value={id}
                                    onChange={(e) => setId(e.target.value)}
                                    required
                                />
                            </td>
                        </tr>

                        <tr>
                            <td>Product Name</td>
                            <td>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                            </td>
                        </tr>

                        <tr>
                            <td>Quantity</td>
                            <td>
                                <input
                                    type="number"
                                    value={qty}
                                    onChange={(e) => setQty(e.target.value)}
                                    required
                                />
                            </td>
                        </tr>

                        <tr>
                            <td>Price</td>
                            <td>
                                <input
                                    type="number"
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                    required
                                />
                            </td>
                        </tr>

                        <tr>
                            <td colSpan="2">
                                <button type="submit">
                                    Add Inventory
                                </button>
                            </td>
                        </tr>

                    </tbody>
                </table>

            </form>
        </div>
    );
}


// Main Component
function InventoryApp() {

    const [inventory, setInventory] = useState([]);

    // GET Inventory
    const getInventory = async () => {

        try {

            const response = await axios.get(API);

            setInventory(response.data);

        } catch (error) {

            console.error("GET Error:", error.message);

        }
    };

    useEffect(() => {
        getInventory();
    }, []);

    return (
        <div>

            <Display_Inventory inventory={inventory} />

            <hr />

            <AddInventory refreshInventory={getInventory} />

        </div>
    );
}

export default InventoryApp;
