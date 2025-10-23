# Team-portfoloio-project

## Portfolio URL
[Our Portfolio (G3-T2)](https://akr-sed.github.io/team-portfoloio-project/)

## Project Overview

This project is done as part of the Software Engineering course Programming Assignment, where it enabled our team to apply software engineering principles, improve collaboration and version-control workflows, and deliver a functional portfolio project showcasing our skills.

## Team members

- ### SEDDIK Abderrehmane Mohamed Akram [(akr-sed)](https://github.com/akr-sed/)
- ### BENMALEK Mohamed Aymen [(generalBenmalek)](https://github.com/generalBenmalek/)
- ### BENAKMOUM Chiraz [(Chirazbkm)](https://github.com/Chirazbkm/)
- ### MEDJOUDJ Taha [(T-Man-05)](https://github.com/T-Man-05/)
- ### BOULAHIA Amani [(amaniblhia)](https://github.com/amaniblhia/)
- ### IOUANOUGHENE Tarek [(yuunooioua-lgtm)](https://github.com/yuunooioua-lgtm/)


## Team Retrospective Analysis

The most significant technical challenge encountered was the handling of concurrent edits to shared high-traffic files—specifically `index.html` and the global stylesheet. Because multiple features were being developed in parallel and requirements evolved, these files became integration hotspots. This led to recurrent merge conflicts, inconsistent naming conventions, and sections being unintentionally overwritten. The absence of early alignment on coding style and low granularity in task decomposition further amplified refactoring overhead.

A representative merge conflict occurred between Amani’s feature branch and the `develop` branch on `index.html`. The conflict could not be resolved through GitHub’s browser UI because entire sections had diverged rather than isolated lines. The resolution was performed locally by:

1. Pulling the latest `develop` into the local machine and attempting a merge.  
2. Opening the conflicted file and manually reviewing both sides of the diff.  
3. Reconstructing the final block by selectively preserving confirmed changes, removing duplicated markup, and restoring broken DOM nesting.  
4. Re-running the site locally to validate layout and script integrity before committing the resolved version.  
5. Pushing the resolved merge and having a second reviewer verify before integration.

The pull-request and peer-review workflow materially improved the quality of the final portfolio. PRs served as natural checkpoints to detect regressions, structural violations, and adherence to naming and layout conventions. Reviews surfaced issues earlier—before they reached `main`—and encouraged rationale-based discussion around design decisions rather than silent edits. Although time constraints sometimes compressed review depth, even lightweight reviews caught critical defects that would have otherwise propagated. Overall, the disciplined use of PRs, enforced branching, and required review gates both reduced integration risk and elevated the maintainability and clarity of the final artifact.

