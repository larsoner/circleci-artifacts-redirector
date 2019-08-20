# circleci-artifacts-redirector

[GitHub app](https://github.com/apps/circleci-artifacts-redirector/) to add a GitHub status link to a CircleCI artifact.

To use this application, add a `.circleci/artifact_path` file whose only
contents are the artifact path. This is typically whatever follows the
CircleCI artifact root path, for example `0/test_artifacts/root_artifact.md`.

Currently has (known) serious limitations:

- Tests do not work properly (haven't gotten around to fixing them)
- Only allows redirecting to a single file that must be configured ahead of time as a file (cannot be changed within the CircleCI run)
- Only pays attention to CircleCI jobs named `build`

Eventually this stuff can all probably be fixed by a bit of work and addition of customization options. For example parsing a YAML file or something else (`setup.cfg`) to get the path would be a good start rather than just using the content of `.circleci/artifact_path` as the filename to use.
