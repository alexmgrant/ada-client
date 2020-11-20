#!/bin/bash
git pull origin master
git rm solutions/\*
git commit -nam "don't push me"
git bundle create ada-fe-test.bundle --all
git reset --hard HEAD~1
zip -r ada-fe-test.zip ada-fe-test.bundle
rm ada-fe-test.bundle
