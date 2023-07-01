PR=159

# checkout pr
gh pr checkout $PR

git pull origin main
# npm install
npm install

#COMMIT
npm test

git push
# GIT PUSH and then checks ( validate )
# watching checks running
#watch -n 3 "gh pr checks $PR"
watch -n 3 "
gh pr checks $PR; echo '---------------';
echo 'PENDING:'
gh pr checks $PR | grep -o pend | wc -w;
echo
echo 'PASSED:'
gh pr checks $PR | grep -o pass | wc -w;
echo
echo 'FAILED:'
gh pr checks $PR | grep -o fail | wc -w;
";
#MERGE PR
gh pr merge $PR -d -m

