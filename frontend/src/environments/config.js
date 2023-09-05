const config = {
  development: {
    apiUrl: "http://localhost:5001/",
  },
};

export default config[process.env.NODE_ENV || "development"];
