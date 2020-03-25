printf "\n\n\n  Deploy in progress! \n\n\n"
ng build --prod
printf "\n\n\n❤️  Build success! ❤️\n\n\n"
printf "\n\n\n Starting to deploy in firebase"
firebase deploy
printf "\n\n\n❤️  Deployed to Firebase! ❤️\n\n\n"