# Log Router Service

This project is a Node.js application written in TypeScript designed to receive logs from a TCP client or pull logs from an S3 bucket and forward these logs to another destination. The application uses streams for various operations like deserialization, filtering, serialization, and forwarding.

While this project is intended primarily for labs and portfolio purposes, it is functional and can be used in practice. Contributions are welcome!

## Features

- Receive logs from a TCP client or S3 bucket
- Stream-based processing for efficient handling
- Transform, filter, serialize, and forward logs

## Prerequisites

- Docker
- Node.js (for development and testing)
- npm (Node Package Manager)

## Getting Started

### Clone the Repository

```sh
git clone https://github.com/diegobcaetano/log-router-service.git
cd log-router-service
```

## Configuration

Ensure you have a configuration file named `server.config.json` in the `./cfg` directory. You can start with the provided sample configuration and adjust as needed.

## Running the Application with Docker

1. Building the Docker image

```sh
docker build -t my-log-router-service .
```

2. Run the Docker container

```sh
docker run -d \
  -e DATA_SOURCE="tcp-client" \
  -e TCP_SERVER_PORT=4000 \
  -e TCP_SERVER_HOST="my_host" \
  -v $(pwd)/cfg:/app/cfg \
  -p 4000:4000 \
  my-log-router-service
```

## Running the Application Locally

1. Set environment variables:

| Variable | Description | Values |
|----------|----------|----------|
| DATA_SOURCE     | Defines where the data comes from   | `tcp-client`, `s3`   |
| TCP_SERVER_HOST | The host address if the data-source is `tcp-client`   | -  |
| TCP_SERVER_PORT | The port address if the data-source is `tcp-client`   | -  |
| S3_BUCKET_NAME | The name of the S3 bucket if the data-source is `s3`   | -  |
| S3_BUCKET_PREFIX | The prefix of the S3 bucket if the data-source is `s3` (optional)   | -  |

2. Install dependencies:

```sh
npm ci
```

3. Building the project

```sh
npm run build
```

4. Run the application:

```sh
npm start
```

### Running Tests

This project uses Jest for testing. To run the tests, use the following command:

```sh
npm test
```

## Roadmap

What I have planned for the next steps:

- Implement work threads for paralelism between streams
- Add more filter options

## Contributing

This project is open-source and contributions are welcome! If you would like to contribute, please fork the repository and submit a pull request.

1. Fork the repository
2. Create a new branch (git checkout -b feature/my-feature)
3. Make your changes
4. Commit your changes (git commit -m 'Add some feature')
5. Push to the branch (git push origin feature/my-feature)
6. Open a pull request

## License

This project is licensed under the MIT License. See the [LICENSE](https://opensource.org/license/mit) file for details.
