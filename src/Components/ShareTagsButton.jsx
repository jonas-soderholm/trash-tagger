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
import { useSharedState } from "../SharedContext.jsx";

function ShareTagsButton() {
  const { sharedMarkers } = useSharedState();

  const handleClick = async () => {
    // Extract marker IDs from sharedMarkers
    const markerIds = sharedMarkers.map((marker) => marker.markId);

    try {
      // Send the marker IDs to the backend to create a shared link
      const response = await axios.post("http://localhost:3100/create-shared-link", { markerIds });

      // Extract the shared link from the response
      const { link } = response.data;

      // Display the link to the user or handle as needed
      console.log("Shared link created:", link);
      alert(`Shared link created: ${link}`);

      // Optionally, copy the link to the clipboard
      navigator.clipboard.writeText(link).then(
        () => {
          console.log("Link copied to clipboard");
        },
        (err) => {
          console.error("Could not copy link to clipboard", err);
        }
      );
    } catch (error) {
      console.error("Error creating shared link:", error);
      alert("Failed to create shared link.");
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
