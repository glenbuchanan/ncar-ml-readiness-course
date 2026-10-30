# Machine Learning Readiness for NSF NCAR Staff

An open-source introduction to machine learning for scientists and engineers who are new to it, built on the CESM2 Large
Ensemble that NSF NCAR distributes on AWS Open Data.

**[Open the lesson in your browser →](https://glenbuchanan.github.io/ncar-ml-readiness-course/)** &nbsp;·&nbsp;
[Module 2 as a Project Pythia cookbook](https://glenbuchanan.github.io/cesm2-lens-ml-readiness-cookbook/) &nbsp;·&nbsp;
[SCORM 1.2 package for an LMS](https://github.com/glenbuchanan/ncar-ml-readiness-course/releases/latest)

| | |
|---|---|
| **Who it is for** | NSF NCAR scientists, engineers and software staff who are new to machine learning, or who use it without training |
| **Length** | About 4.5–5 hours, plus writing (estimated with simulated learners) |
| **Prerequisites** | Python at the level of the ESDS Xarray tutorial. Module 1 needs no code at all |
| **Status** | Draft, awaiting subject-matter review. See [How it was made](#how-it-was-made) |

## What is in it

| Unit | What you do | Where |
|---|---|---|
| Pretest | 10 items, two per objective, recorded and not shown as feedback | [`course/item-bank.csv`](course/item-bank.csv) |
| **Module 1 · Foundations** | A no-code lesson: what machine learning is, the eight-step supervised analysis, ML at NSF NCAR today, what an AI weather model does differently. About one hour | [in the browser](https://glenbuchanan.github.io/ncar-ml-readiness-course/) · [source](docs/lesson/) |
| **Module 2 · A classifier on CESM2 LENS** | Build and validate a classifier on a climate-model ensemble, and justify the model you choose | [`course/02_applications.ipynb`](course/02_applications.ipynb) |
| **Module 3 · A small neural net and explainability** | Train a small network on the same task, explain one prediction, and see what an AI weather model does | [`course/03_analysis.ipynb`](course/03_analysis.ipynb) |
| Handbook and rubric | Each exercise ends with a handbook entry; the rubric scores it Not yet · Developing · Proficient | [`course/handbook.md`](course/handbook.md) · [`course/rubric.md`](course/rubric.md) |
| Quiz and boosters | 10 items twinned to the pretest; three one-question boosters at 2 days, 2 weeks and 2 months. Answer keys are held back for trainers | [`course/item-bank.xlsx`](course/item-bank.xlsx) (items and boosters) |

## Learning objectives

After the course, you will be able to:

1. Tell which Earth system science problems suit supervised machine learning and which do not, given the data and the decision.
2. Explain the steps of a supervised analysis (framing, data, split, train, validate, refine, test, justify) and the failure each
   step guards against.
3. Build and validate a classifier on a climate-model ensemble, report precision, recall and a confusion matrix, and justify the
   model you choose honestly, including when the simplest one wins.
4. Train a small neural network on the same task and explain, with one attribution method, which inputs drove a prediction.
5. Describe what an AI weather model does differently from a numerical model, and two conditions under which its output should not
   be trusted.

## Run the notebooks

```bash
conda env create -f course/environment.yml
conda activate ncar-ml-readiness
jupyter lab course/
```

Modules 1–2 and Module 3's network run on a laptop, reading the AWS copy of the ensemble; no HPC account is needed. The
committed table `course/data/member_winters.csv` (100 members, winters 1900–2014) lets the notebooks run offline, and Module 2
can rebuild it from AWS. Module 3's optional AI-weather-model inference step needs `course/environment-gpu.yml` and one GPU
with at least 48 GB.

## How it was made

Drafted with AI assistance (Anthropic's Claude) from cited sources, under the author's direction, and reviewed by the author in several full read-throughs. Text and code were checked against those sources and the notebooks' own outputs by automated tests and by separate AI review sessions (also Claude); no human subject-matter expert has reviewed it yet.
Learner timings and item statistics quoted in the course
come from simulated learners, not real ones, and are labelled that way. Nothing here is produced, sponsored, reviewed or endorsed by
NSF NCAR, UCAR, COMET or NSF Unidata.

**How it was checked** (as of 2026-10-30). The checks and records named below are the author's own and are not part of this
repository:

- **Sources, not memory.** The text cites 40 of the 67 source records in the author's research library (papers, NSF NCAR data
  documentation, the NSF Unidata series, NWS outlooks, software documentation), each recorded with its licence and retrieval
  date, 34 of them with the exact passages quoted. Every prose paragraph of 40 words or more in the notebooks and handbook must
  cite one, or the check fails; every quotation in the lesson is checked by script, word for word, against its source.
- **Checks that are proven to fail.** 20 automated checks run in the author's pipeline (structure, sources and quotations, links, licences
  and media credits, accessibility, the SCORM package, and full execution of both notebooks; one of the 20 checks the application packet), and each is tested by planting
  an error it must catch.
- **Review, reproduced before it is acted on.** Separate AI review sessions (also Claude) read the work as a Project Pythia advocate
  and as a skeptical Earth system scientist, over six rounds on the Module 2 notebook alone. A finding was acted on only after
  it was reproduced, by re-running the notebook's code or fetching the cited source. They caught real errors, among them an
  overstated result that is now corrected.
- **The result, tested out of sample.** The standalone [cookbook version of Module 2](https://glenbuchanan.github.io/cesm2-lens-ml-readiness-cookbook/)
  runs the held-out test and then an out-of-period test on the same members' untouched 2016–2100 winters, under a protocol fixed
  before the scored run (self-attested; the protocol ships verbatim in the cookbook). The small edge seen on the historical test members is not confirmed:
  it does not replicate under the rule fixed before the run, and the test was too small to rule an edge of that size out. The course itself still leaves its test to the learner.
- **Not yet:** a human subject-matter review. Review from people who know CESM2 and ENSO is welcome.

The course follows the shape of NSF Unidata's
[*Supervised Machine Learning Readiness*](https://github.com/Unidata/supervised-ml-readiness) (Apache-2.0); short quotations from it are credited where they appear.

## Data

- Grover, M., & Banihirwe, A. (2021). *NCAR CESM2 Large Ensemble Cloud-Optimized Dataset*. NSF NCAR Computational and
  Information Systems Laboratory. https://doi.org/10.26024/y48t-q717
- Rodgers, K. B. et al. (2021). Ubiquity of human-induced changes in climate variability. *Earth System Dynamics* 12,
  1393–1411. https://doi.org/10.5194/esd-12-1393-2021

CESM2 LENS was accessed on 2026-10-20 from https://registry.opendata.aws/ncar-cesm2-lens under the UCAR Data Terms of Use
(CC BY 4.0). Results based on it acknowledge the CESM2 Large Ensemble Community Project and supercomputing resources provided by
the IBS Center for Climate Physics in South Korea.

## Licence and credits

Content © 2026 Glen Buchanan, [CC BY 4.0](LICENSE-CONTENT.md). Code [Apache-2.0](LICENSE). Third-party images, the lesson
template and the lightbox keep their own terms: see [NOTICE.md](NOTICE.md) and the
[media register](course/media-register.csv). To cite the course, use [CITATION.cff](CITATION.cff).

Contributions and corrections are welcome: [CONTRIBUTING.md](CONTRIBUTING.md).
