import React from "react";

function CreateUserForm() {
    return (
        <form userName="FormElement">
            <label for="userName">User Name</label>
            <input type="text" name="userName" />

            <button type="submit">Submit</button>
        </form>
    );
}

export default CreateUserForm;