import React, { Fragment, useState } from "react";
import axios from 'axios'

const Test = () => {
  const [description, setDescription] = useState("");

  const onSubmitForm = async e => {
    e.preventDefault();
    try {
      const body = { description };
                                await axios.post('/test', body,{ proxy : { host: '127.0.0.1', port: '5000' } } )
                                .then((response) => {
                                  console.log(response);
                                }, (error) => {
                                  console.log(error);
                                });
                                window.location = '/'
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Fragment>
      <h1 className="text-center mt-5">Pern Todo List</h1>
      <form className="d-flex mt-5" onSubmit={onSubmitForm}>
        <input
          type="text"
          className="form-control"
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
        <button className="btn btn-success">Add</button>
      </form>
    </Fragment>
  );
};

export default Test;