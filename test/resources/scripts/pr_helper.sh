PR=159

# checkout pr
gh pr checkout $PR


# npm install
npm install


# GIT PUSH and then checks ( validate )
# watching checks running
watch -n 3 "gh pr checks $PR"

#MERGE PR
gh pr merge $PR -d -m

