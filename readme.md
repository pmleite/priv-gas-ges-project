## 1. Prepare Visual Studio code for Google App Script development ## 

```
sudo npm -g install typescript && sudo npm i -S @types/google-apps-script && sudo npm install -g @google/clasp && sudo npm -g install eslint prettier eslint-config-prettier eslint-plugin-prettier
```

## Make Login ##

```
clasp login --no-localhost
```

## Create Project ##

```
clasp create --type standalone --title "Project Title"
```


## Push Project ##

```
clasp clone "ID inside quote" --rootDir src
clasp -P src/ push
```

### For more infor  see: ###
https://hackernoon.com/writing-google-apps-script-code-locally-in-vscode
https://jasonjurotich.medium.com/quick-setup-for-google-clasp-fb4b8fc51f39

Must enable google appscript api
https://script.google.com/home/usersettings


