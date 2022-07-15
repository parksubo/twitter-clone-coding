import React from "react";

// for Home import
const Home = () => {
    return (
        <div>
        <form>
            <input
                type="text"
                placeholder="what's on your mind?"
                maxLength={120}
            />
            <input
                type="submit"
                value="Tweet"
            />
        </form>
    </div> 
    );
}    

export default Home;
