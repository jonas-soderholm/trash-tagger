import React from "react";

class BackendTesting extends React.Component {
  fetchUsers = async () => {
    try {
      const response = await fetch("http://localhost:3100/TagInformation");
      const data = await response.json();
      console.log("TagInformation:", data);
    } catch (error) {
      console.error("Error fetching TagInformation:", error);
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
