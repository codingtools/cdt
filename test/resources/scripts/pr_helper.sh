PR=159

# checkout pr
gh pr checkout $PR

git pull origin release/release-v0.x

# npm install
npm install
git push

# GIT PUSH and then checks ( validate )
# watching checks running
watch -n 3 "gh pr checks $PR"


#MERGE PR, delete branch and merge in place of other options
gh pr merge $PR -d -m

