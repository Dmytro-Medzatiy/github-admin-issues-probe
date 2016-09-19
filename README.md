# github-admin-issues-probe

<img src="https://github.com/dmytro-medzatiy/github-admin-issues-probe/blob/master/screenShotGithubAdmin.png" style="width: 100%;"></img>


### Quick start

You can try it online at https://quiet-bayou-96623.herokuapp.com/

OR

1. Clone this repo using `git clone --depth=1 https://github.com/dmytro-medzatiy/github-admin-issues-probe.git`
2. Change dir 
3. Run `npm install` to install dependencies
4. Run `npm run start` and open in browser `http://localhost:3000`

### General Info

This tool was created in learning purpose. The main aim of this tool is to show information about GitHub user repositories, existing issues, issue comments and labels

### Features

-*GitHub Authorization* - with Basic Authentication 

-*Input of GitHub author and loading repositories list* - then you can choose any repo from the list and tool will loading Issues of choosen repo

-*Issues list* - supported GitHub Pagination. If number of Issues more than 10, pagination component will appear and gives opportunity to switch number of issues per page and use standard pagination mechanism

-*Issue content* - Shows Issue text, comments and labels

-*Labels editor* - if you are signed and have rights to change available labels of issue - you can do it by clicking on the Icon

### Security issue

For managing issue labels you have to Sign In with your GitHub login and password. Take into account that this tool does not have any additional security modules - your password will be transferred through the standard HTTP request in base64 encoding. This tool does not store any passwords or other user information.

Without authorization you still can view information about any existing GitHub user, repos and issues but you will be limited by 60 request per hour

### Main workflow

<ul>
<li>Sign In or use tool without signing in</li>
<li>Enter GitHub user name and click on "GET INFO" or push "Enter" button</li>
<li>Choose user repository from the given list</li>
<li>If repo has issues, choose one from the list</li>
<li>You can show/hide comments</li>
<li>You can manage labels if you are signed and you are the owner/admin of this repo</li>
</ul>


