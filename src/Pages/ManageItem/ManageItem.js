import React from "react";
import useItems from "../../hooks/useItems";
import { confirm } from "react-confirm-box";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import "@fortawesome/fontawesome-svg-core/styles.css";
import "./ManageItem.css";
const ManageItem = () => {
    const [items, setItems] = useItems();


    const handleDelete = async(id) => {
        const options = {
            closeOnOverlayClick: true,
            labels: {
                confirmable: "Yes",
                cancellable: "No",
            },
        };
        const result = await confirm("Are you sure?", options);
        // const proceed = window.confirm("Are you sure?");
        if (result) {
            const url = `http://localhost:5000/fruit/${id}`;
            fetch(url, {
                method: "DELETE",
            })
                .then((res) => res.json())
                .then((data) => {
                    const remaining = items.filter((item) => item._id !== id);
                    setItems(remaining);
                });
        }
    }
    return (
        <div className="container">
            <h2 className="mb-5 section-title">
                All<span> Products</span>
            </h2>
            
            <ul class="list-unstyled">
                {items.map((item) => (
                    <>
                        <li class="media align-items-center justify-content-between mb-3">
                            <img
                                src={item.image}
                                class="align-self-center mr-3"
                                alt=""
                            />
                            <div class="media-body">
                                <h5 class="mt-0 mb-1 display-6">{item.name}</h5>
                                <h5>Price : {item.price}</h5>
                                <h5>Quantity : {item.quantity}</h5>
                                <p>{item.description}</p>
                                <p>Supplier : {item.supplier}</p>
                            </div>
                            <div>
                                <button
                                    onClick={() => handleDelete(item._id)}
                                    className="btn btn-danger"
                                >
                                    <FontAwesomeIcon icon={faTrash} />
                                </button>
                            </div>
                        </li>
                        <hr />
                    </>
                ))}
            </ul>
        </div>
    );
};

export default ManageItem;