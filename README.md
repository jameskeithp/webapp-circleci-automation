# Web App CI/CD Automation

A working reference project demonstrating an end-to-end CI/CD pipeline: a
Node.js/Express sample app, containerized with Docker, built and published
through CircleCI, and deployed to Kubernetes.

## What it does

- **Sample app** (`src/`) — minimal Express app served on port 3000:
  `GET /` returns "Hello World", `GET /users` returns a JSON user list
  (via `src/helper.js`). A static page lives in `public/`.
- **Container** (`Dockerfile`) — `node:14-alpine` image, app code copied in,
  dependencies installed, port 3000 exposed.
- **CI pipeline** (`.circleci/config.yml`) — the `build` job checks out the
  code and runs `npm install` / `npm run build`; the `docker-build` job
  builds the image and pushes `node-app:latest`.
- **Kubernetes** (`k8s/`) — a Deployment running 3 replicas of
  `node-app:latest`, fronted by a LoadBalancer Service (port 80 → 3000).

## Repository layout

```
.
├── .circleci/config.yml   # build + docker-build jobs
├── Dockerfile             # node:14-alpine, port 3000
├── k8s/
│   ├── deployment.yml     # 3 replicas of node-app:latest
│   └── service.yml        # LoadBalancer, 80 → 3000
├── src/
│   ├── index.js           # Express app
│   └── helper.js          # getUsers()
└── public/                # static index.html + styles.css
```

## Run it locally

```bash
docker build -f Dockerfile -t node-app .
docker run -p 3000:3000 node-app
# open http://localhost:3000
```

## Deploy to Kubernetes

```bash
kubectl apply -f k8s/
kubectl get svc node-app   # note the external IP
```

## Notes

This is a demonstration/reference project for CI/CD concepts — build once in
CI, ship the immutable image, deploy declaratively. The pipeline pushes the
`latest` tag; for production use, pin immutable tags (e.g. the git SHA) and
scan the image before deploy.
