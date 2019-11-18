#!/bin/sh

function obtain_git_branch {
  br=`git branch | grep "*"`
  echo ${br/* /}
}

echo "the file status ====>>>>"
git status

echo "add file ====>>>>"

git add .

echo "add file ====>>>> success"

read -p "please input the commit message: " message

git commit -m "$message"



echo "the file status ====>>>>"

git status


read -p "Do you want to push the commits (y/n)?" result

if [ "$result"x = "y"x ];

then

  branch=`obtain_git_branch`

  echo "Current git branch is $branch"

  git push origin $branch

  git open

else
  echo "Canceled to push commit"

fi


