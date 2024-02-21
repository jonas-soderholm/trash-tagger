// import React from "react";

// function ShareTagsButton() {
//   return (
//     <div className="flex justify-center ">
//       <button className="send-button body-font text-xl bg-opacity-50 backdrop-blur-xl flex px-5 py-4 rounded-full fixed mb-10 p4 hover:bg-slate-500 share-button bottom-2 mx-auto">
//         Share your tags!
//       </button>
//     </div>
//   );
// }

// export default ShareTagsButton;

import React from "react";
import axios from "axios";

function ShareTagsButton() {
  console.log("Share button clicked");

  const handleClick = async () => {
    try {
      // Send an HTTP POST request to your backend API endpoint
      await axios.post("http://localhost:3100/TagInformation", {
        // markId: 22,
        latitude: 22.555,
        longitude: 2321312.2323,
        tagInformation: "1: Ciggarettes here",
      });
      alert("Tag added successfully!");
    } catch (error) {
      console.error("Error adding tag:", error);
    }
  };

  return (
    <div className="flex justify-center">
      <button
        className="send-button body-font text-xl bg-opacity-50 backdrop-blur-xl flex px-5 py-4 rounded-full fixed mb-10 p4 hover:bg-slate-500 share-button bottom-2 mx-auto"
        onClick={handleClick}
      >
        Share your tags!
      </button>
    </div>
  );
}

export default ShareTagsButton;
