# !/bin/bash

# git add .
# read -p "Enter Commit Message: "  commit
# git commit -m "$commit"
# git push origin master
printf "\n\n\n❤️  Pushed to Github!  ❤️\n\n\n"

push() {
    echo "<>git status"
    git status
    read -r "green?"  green
    echo "<>git add ."
    git add .
    echo '<>git commit -m "'$2'"'
    git commit -m "$2"
    echo "<>git push origin $1"
    git push origin $1
}