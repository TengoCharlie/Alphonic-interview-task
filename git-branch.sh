#!/bin/bash

addFileDefault="."
addFileDefaultTemp=""
commitMessage="My First Commit"
commitMessageTemp=""
branchName="main"
branchNameTemp=""
upStream=""
upStreamTemp="N"

echo -e "Please enter file name to make git: ($addFileDefault)"
read addFileDefaultTemp
echo -e "Please Enter Commit message: ($commitMessage)"
read commitMessageTemp
echo -e "Please enter Branch name: ($branchName)"
read branchNameTemp
echo -e "Please select --set-upstream branch: (N)(Y/N)"
read upStreamTemp

if [ "$addFileDefaultTemp" != "" ]; then
    echo -e "File added is: $addFileDefaultTemp"
    addFileDefault=$addFileDefaultTemp
fi

if [ "$commitMessageTemp" != "" ]; then
    echo -e "Your Commit message is: $commitMessageTemp"
    commitMessage=$commitMessageTemp
fi

if [ "$branchNameTemp" != "" ]; then
    echo -e "Your Branch name is: $branchNameTemp"
    branchName=$branchNameTemp
fi
if [ "$upStreamTemp" == "Y" ] || [ "$upStreamTemp" == "y" ]; then
    echo -e "Your --set-upstream branch is: --set-upstream"
    upStream="--set-upstream"
fi
if [ "$branchName" == "main" ]; then
    git add $addFileDefault
    git commit -m "$commitMessage"
    git branch -M main
    git push -u origin main
else 
    git branch $branchName
    git checkout $branchName
    git add $addFileDefault
    git commit -m "$commitMessage"
    git push $upStream origin $branchName
fi


# Git automation