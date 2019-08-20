# circleci-artifacts-redirector

GitHub app to add a GitHub status link to a CircleCI artifact.

To use this application, add a `.circleci/artifact_path` file whose only
contents are the artifact path. This is typically whatever follows the
CircleCI artifact root path, for example `0/test_artifacts/root_artifact.md`.

Currently has (known) serious limitations:

- the tests do not work properly (haven't gotten around to fixing them)
- only allows redirecting to a single file that must be configured ahead of time as a file (cannot be changed within the CircleCI run)
- treats all CircleCI runs the same way, so multi-stage CircleCI builds will probably not link properly

Eventually this stuff can all probably be fixed by additional customization options.
