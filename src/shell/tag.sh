#!/bin/sh
echo "the tag you have ====>>>>"
git tag

read -p "input the version you want to publish: " version

echo "the version is ====>>>> $version"

read -p "input the version message: " $message

echo "the message is ====>>>> $message"

git tag -a "$version" -m "$message"


echo "the tag status ====>>>>"

git tag



