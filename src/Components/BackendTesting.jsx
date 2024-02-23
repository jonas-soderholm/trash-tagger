import React from "react";

class BackendTesting extends React.Component {
  fetchUsers = async () => {
    try {
      const response = await fetch("http://localhost:3100/MarkerInformation");
      if (!response.ok) {
        // This will catch HTTP errors like 500 Internal Server Error
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log("MarkerInformation:", data);
    } catch (error) {
      console.error("Error fetching MarkerInformation:", error);
    }
  };

  render() {
    return (
      <div>
        <button className=" w-52" onClick={this.fetchUsers}>
          Fetch TagInformation
        </button>
      </div>
    );
  }
}

export default BackendTesting;
