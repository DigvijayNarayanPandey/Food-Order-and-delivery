const Contact = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <h1 className="font-bold text-3xl p-4 m-4">Contact Us Page</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="contact-name" className="sr-only">Name</label>
        <input
          id="contact-name"
          name="name"
          type="text"
          className="border border-black p-2 m-2"
          placeholder="name"
        />
        <label htmlFor="contact-message" className="sr-only">Message</label>
        <input
          id="contact-message"
          name="message"
          type="text"
          className="border border-black p-2 m-2"
          placeholder="message"
        />
        <button type="submit" className="border border-black p-2 m-2 bg-gray-400 rounded-lg">
          Submit
        </button>
      </form>
    </div>
  );
};
export default Contact;
