import React, { useState, useEffect } from "react";
import { useSharedState } from "../../SharedContext.jsx";
import { v4 as uuidv4 } from "uuid";

function ButtonShareMarkers() {
  const { sharedMarkers, setSharedMarkers } = useSharedState();
  const { isSharedLink, setIsSharedLink } = useSharedState();
  // eslint-disable-next-line no-unused-vars
  const { markersLoaded, setMarkersLoaded } = useSharedState();
  const { isMobile } = useSharedState();
  const { mapArray } = useSharedState();

  // State for managing modal visibility and the shareable link
  const [showModal, setShowModal] = useState(false);
  const [shareableLink, setShareableLink] = useState("");

  const sendMarkerData = async () => {
    const uuidMarkers = uuidv4();
    const updatedUuidMarkers = sharedMarkers.map((marker) => ({
      ...marker,
      groupId: uuidMarkers,
    }));

    try {
      const response = await fetch("http://localhost:5000/MarkerInformation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedUuidMarkers),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Update the shareable link state and show the modal
      const link = `http://localhost:3000/shared-markers?groupId=${uuidMarkers}`;
      //const link = `${window.location.origin}/shared-markers?groupId=${uuidMarkers}`;
      setShareableLink(link);

      setShowModal(true); // Show the modal with the link
    } catch (error) {
      console.error("Error sending marker data:", error);
    }
  };

  const fetchGroupMarkers = async (groupId) => {
    const url = `http://localhost:5000/shared-markers?groupId=${groupId}`;
    console.log("fetch marker1");

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        const data = await response.json();
        console.log("DATA: ", data);
        setSharedMarkers(data);
        setIsSharedLink(true);
        setMarkersLoaded(true);
      } else {
        console.error("Unexpected response format:", contentType);
        // Handle non-JSON response here
        // For example, display an error message to the user
      }
    } catch (error) {
      console.error("Error fetching group markers:", error.message);
      console.error("Error details:", error);
    }
  };

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const groupId = queryParams.get("groupId");

    console.log("Group ID:", groupId);

    if (groupId) {
      fetchGroupMarkers(groupId);
      console.log("asd1");
    } else {
      setMarkersLoaded(true);
      console.log("asd2");
    }
  }, []);

  // Function to copy the shareable link to clipboard
  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareableLink).then(
      () => {
        // Optional: Display a message or change button text/state to indicate the link was copied
      },
      (err) => {
        console.error("Could not copy text: ", err);
      }
    );
  };

  // Modal
  const ShareModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[1007] ">
      <div className="bg-white p-4 rounded-lg shadow-lg flex flex-col items-center">
        <p>Here's your shareable link:</p>
        <input
          type="text"
          readOnly
          value={shareableLink}
          className="text-center p-2 border border-gray-300 rounded mt-2"
          onClick={(e) => e.target.select()}
        />
        <div className="flex gap-3 mt-3">
          <button
            className="px-4 py-2 my-auto  bg-blue-500 text-white rounded hover:bg-blue-700"
            onClick={copyToClipboard}
          >
            Copy
          </button>
          <button
            className="px-4 py-2 my-auto  bg-blue-500 text-white rounded hover:bg-blue-700"
            onClick={() => setShowModal(false)}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {showModal && <ShareModal />}
      {isMobile ? (
        <>
          <button
            onClick={sendMarkerData}
            className={`send-button ${
              mapArray.length === 0 ? "hidden" : "visible"
            } text-xs px-3 text-center my-auto py-2 rounded-full share-button-mobile`}
          >
            Share tags!
          </button>
        </>
      ) : (
        <>
          {!isSharedLink && (
            <div className="flex justify-center">
              <button
                className="share-button-mobile body-font  text-xl backdrop-blur-xl flex px-5 py-4
                 rounded-full fixed mb-10 p4 bottom-2 mx-auto hover:bg-gray-400 "
                onClick={sendMarkerData}
              >
                Share tags!
              </button>
            </div>
          )}
        </>
      )}
    </>
  );
}

export default ButtonShareMarkers;
