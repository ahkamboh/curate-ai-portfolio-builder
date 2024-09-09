import React from 'react';

interface ContactProps {
  emailBody: string;
  setEmailBody: React.Dispatch<React.SetStateAction<string>>;
  emailSubject: string;
  setEmailSubject: React.Dispatch<React.SetStateAction<string>>;
  userEmail: string;
  setUserEmail: React.Dispatch<React.SetStateAction<string>>;
  userURL: string;
  setUserURL: React.Dispatch<React.SetStateAction<string>>;
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Contact: React.FC<ContactProps> = ({
  emailBody,
  setEmailBody,
  emailSubject,
  setEmailSubject,
  userEmail,
  setUserEmail,
  userURL,
  setUserURL,
  isModalOpen,
  setIsModalOpen,
}) => {
  // Construct the mailto link
  const createMailtoLink = () => {
    return `mailto:${userEmail}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(
      emailBody
    )}%0A%0AURL:%20${encodeURIComponent(userURL)}`;
  };

  // Handle double-click to redirect
  const handleDoubleClick = () => {
    const mailtoLink = createMailtoLink();
    window.location.href = mailtoLink; // Redirect user to mailto link
  };

  const handleContactClick = () => {
    setIsModalOpen(true); // Open the shared modal on click
  };

  const handleFormSubmit = () => {
    setIsModalOpen(false); // Close the modal
  };

  return (
    <div
      className="flex mt-5 justify-between h-[400px] relative overflow-hidden bg-[#1b1b1b] border-2 p-5 border-neutral-800 rounded-xl"
      onDoubleClick={handleDoubleClick} // Double click to redirect
    >
      <div className="w-full flex flex-col z-10 gap-8 justify-center items-center text-center">
        <h1 className="text-white text-4xl font-semibold" contentEditable>
          Have idea about project?
        </h1>
        <p className="text-[#c0c0c0] text-lg font-normal max-w-lg" contentEditable>
          Write anything here something about yourself to showcase <br /> what actually you doing or targeting etc.
        </p>
        <button onClick={handleContactClick}  className='hover:bg-[#e63e21c6] shadow-[0px_1px_37px_0px_#e63e21af] bg-[#e63e21] border-2 border-[#171717] rounded-md flex justify-center items-center'>
              <span className='px-2 font-semibold'>Hire me</span>
              <div className="h-10 w-0.5 bg-[#171717]"></div>
              <div className="px-2">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M13 7.99854H8V12.9985C8 13.2638 7.89464 13.5181 7.70711 13.7056C7.51957 13.8932 7.26522 13.9985 7 13.9985C6.73478 13.9985 6.48043 13.8932 6.29289 13.7056C6.10536 13.5181 6 13.2638 6 12.9985V7.99854H1C0.734784 7.99854 0.48043 7.89318 0.292893 7.70564C0.105357 7.51811 0 7.26375 0 6.99854C0 6.73332 0.105357 6.47896 0.292893 6.29143C0.48043 6.10389 0.734784 5.99854 1 5.99854H6V0.998535C6 0.733319 6.10536 0.478964 6.29289 0.291428C6.48043 0.103892 6.73478 -0.00146484 7 -0.00146484C7.26522 -0.00146484 7.51957 0.103892 7.70711 0.291428C7.89464 0.478964 8 0.733319 8 0.998535V5.99854H13C13.2652 5.99854 13.5196 6.10389 13.7071 6.29143C13.8946 6.47896 14 6.73332 14 6.99854C14 7.26375 13.8946 7.51811 13.7071 7.70564C13.5196 7.89318 13.2652 7.99854 13 7.99854Z" fill="white" />
                </svg>
              </div>
            </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-30 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-[#1b1b1b] border-2 border-neutral-800 p-6 rounded-lg">
            <h3 className="text-white mb-4">Send me an Email</h3>
            <input
              type="email"
              placeholder="Your Email"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
              className="w-full mb-2 p-2 bg-[#2c2c2c] border border-neutral-800 rounded-md text-white"
            />
            <input
              type="text"
              placeholder="Subject"
              value={emailSubject}
              onChange={(e) => setEmailSubject(e.target.value)}
              className="w-full mb-2 p-2 bg-[#2c2c2c] border border-neutral-800 rounded-md text-white"
            />
            <textarea
              placeholder="Body"
              value={emailBody}
              onChange={(e) => setEmailBody(e.target.value)}
              className="w-full mb-2 p-2 bg-[#2c2c2c] border border-neutral-800 rounded-md text-white"
              rows={4}
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-gray-600 text-white rounded-md"
              >
                Cancel
              </button>
              <button onClick={handleFormSubmit} className="px-4 py-2 bg-[#e63e21] text-white rounded-md">
              Add
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Contact;
