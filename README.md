# circleci-artifacts-redirector

GitHub app to add a GitHub status link to a CircleCI artifact.

To use this application, add a `.circleci/artifact_path` file whose only
contents are the artifact path. This is typically whatever follows the
CircleCI artifact root path, for example `0/test_artifacts/root_artifact.md`.

Currently the tests do not work properly
(haven't gotten around to fixing them).
