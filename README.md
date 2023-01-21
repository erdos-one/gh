<p align="center">
  <a href="https://github.com/erdos-one/gh">
    <img alt="gh.erdos.one" src="https://emojipedia-us.s3.amazonaws.com/source/microsoft-teams/337/pinching-hand_1f90f.png" width="150"/>
  </a>
</p>

<h1 align="center">gh.erdos.one — For shorter install commands</h1>

Be gone the era of typing `https://raw.githubusercontent.com/...`

The main impetus for this project's existence is frustration with overly verbose install commands.
Many developers write beautiful install scripts only to present their users with horrid, needlessly
verbose install commands. Let's make those install commands less daunting and improve our users'
experience!

## Usage

### Fetch any file

To fetch *any file* in *any branch* of *any repo*, use the following format:

```bash
https://gh.erdos.one/user/repo/branch/filepath
```

Fetching this URL will return the raw file located at
`https://raw.githubusercontent.com/user/repo/branch/path`. Doing so only saves 14 characters, which
might not seem like much, but is helpful nonetheless. The real magic of this URL shortener, though,
comes from the following use cases.

### Fetch any file in the main branch

To fetch *any file* in the *main branch* of *any repo*, use the following format:

```bash
https://gh.erdos.one/user/repo/filepath
```

### Fetch install.sh in the main branch

To fetch the file *install.sh* in the *main branch* of *any repo*, use the following format:

```bash
https://gh.erdos.one/user/repo
```

## How it works

A simple Cloudflare worker powers this shortener. You can find the source code of the worker
[here](src/index.ts).
