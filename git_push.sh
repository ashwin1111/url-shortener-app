# !/bin/bash

git add .
read -p "Enter Commit Message: "  commit
git commit -m "$commit"
git push origin master
printf "\n\n\n❤️  Pushed to Github!  ❤️\n\n\n"