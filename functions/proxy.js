// const fetch = require("node-fetch"); // Si usas node-fetch
const fetch = globalThis.fetch; // Si usas Node.js v18+

exports.handler = async (event) => {
  console.log("Request received:", JSON.stringify(event, null, 2));

  const targetUrl = `http://ec2-52-15-169-133.us-east-2.compute.amazonaws.com${event.path}`;

  console.log("Target URL:", targetUrl);

  try {
    // Agregamos un timeout de 10 segundos (10000 ms)
    console.log("Making request to target URL...");
    const response = await fetch(targetUrl, {
      method: event.httpMethod,
      headers: {
        "Content-Type": "application/json",
        ...event.headers,
      },
      body: event.httpMethod === "GET" ? undefined : event.body,
      timeout: 10000, // 10 segundos de timeout
    });

    console.log("Response received from target URL.");
    const responseBody = await response.text();

    console.log("Response status:", response.status);
    console.log("Response body:", responseBody);

    return {
      statusCode: response.status,
      body: responseBody,
    };
  } catch (error) {
    console.error("Error in proxy:", error);

    return {
      statusCode: 500,
      body: JSON.stringify({
        error: "Error in proxy function",
        details: error.message,
      }),
    };
  } finally {
    console.log("Proxy function execution completed.");
  }
};
