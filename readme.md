## 1. Prepare Visual Studio code for Google App Script development ## 

```
sudo npm -g install typescript && sudo npm i -S @types/google-apps-script && sudo npm install -g @google/clasp && sudo npm -g install eslint prettier eslint-config-prettier eslint-plugin-prettier
```

## 2. Make Login ##

```
clasp login --no-localhost
```

## 3. Create Project ##

```
clasp create --type standalone --title "Project Title"
```


## 4. Push Project ##

```
clasp clone "ID inside quote" --rootDir src
clasp -P src/ push
```

### For more information  see: ###

https://hackernoon.com/writing-google-apps-script-code-locally-in-vscode \n
https://jasonjurotich.medium.com/quick-setup-for-google-clasp-fb4b8fc51f39

### Must enable google appscript api ###
https://script.google.com/home/usersettings


