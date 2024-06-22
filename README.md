## Instructions for setting up your local environment

First check that you have installed _git_, by

`git --version`

Then you should create a local folder (name it whatever you want) and navigate into that folder, by

`cd folder_name`

Then you can clone the repo from clicking the clone button at the top right of this page, select clone by https, and copy the url and key in this command into your terminal:

`git clone git_url`

then check that you have done it correctly by navigating into the repo:

`cd Green-Living`

then install all the packages (make sure you have npm installed, if dont have go google):

`npm install`

then to create a new branch:

`git checkout -b new_branch_name`

you should always be working on a branch that is not main, you can check which branch you are on by:

`git branch`

now, you can work on your new branch!

when you are done with your changes:

1. stage your changes:

   `git add .`

2. commit your changes with an appropriate message:

   `git commit -m 'feat: what_does_your_component_do'`

3. go to main branch (hopefully you were not on the main branch) and pull the latest changes:

   `git checkout main`
   `git pull`

4. go back to your branch and merge your the new main with your changes (you might need to --set-upstream when pushing for the first time, just copy the command given by the terminal when you type git push):

   `git checkout your_branch_name`
   `git push`

5. after you have pushed your code, click on the link in the terminal to bring you to the git hub page:

- change the title of your pull request (if you want)
- check that your code that you are pushing is correct one last time
- click on 'create a pull request'

6. If github does not complain about any merge conflicts, you can proceed to merge your branch with the main one by clicking on the 'merge pull request' button

7. delete your branch when prompted (always good practice to delete after you are done). yay and you are done
