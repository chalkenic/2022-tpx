# TPX Challenge

<div class="boxBorder">

URL shortening service challenge.

## Usability Assumptions

Application was created with assumption of users having node.js installed locally, with code additionally being written in JavaScript. React client frontend programming architecture assumes use of Chromium - results may vary if another browser chosen.

## Installation Assumptions

- Git installed - [Windows Link](https://gitforwindows.org/)
- Node.js installed - [Link](https://nodejs.org/en/download/)

## Code Setup - complete via Command Prompt/Git Bash

### 1. Initial clone from Main branch
```bash
# Clone repository
git clone https://github.com/chalkenic/tpx_challenge.git
```

### 2.  Build local version of application using commands below:
###     

```bash
# 1. Navigate into directory folder
cd tpx_challenge

# 2. Install modules within parent folder
npm install

# 3. Complete further client and server installations
npm run packageInstall

# 4 launch Application and Server: 
npm run start

```


### 3. After following commands have been completed, navigate to application:

#### Client: localhost:3000
#### Server: localhost:3001


## Tests

Unit testing exists within the server in order to confirm logic on server side works as intended.
```bash
# navigate to parent folder within terminal
cd tpx_challenge

# Launch tests
npm run test

</div
