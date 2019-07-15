# Volt Review Apps

The authoritative source of information for creating review apps using Hokusai
can be found here:

https://github.com/artsy/hokusai/blob/master/docs/Review_Apps.md

But I've found that a bit noisy and so I'm distilling all that info to a short
list of commands to run:

```sh
# create a new config file
$ hokusai review_app setup 1234
# update config file with the image tag 1234
$ sed -i "" "s/staging/1234/g" hokusai/1234.yml
# commit the config file
$ git add hokusai/1234.yml
$ git commit -m "Config for review app 1234"
# push the image - this takes a while...stop if it doesn't exit cleanly!
$ hokusai registry push --force --tag 1234
# create a review app called 1234
$ hokusai review_app create 1234
# copy over the env from staging
$ hokusai review_app env copy 1234 --configmap nginx-config
# inspect review app and get url
$ hokusai review_app status 1234
# or if you're feeling super 1337:
$ hokusai review_app status 1234 | grep service | tr -s [:blank:] | cut -d ' ' -f 4 | pbcopy
```

## Update Gravity

But wait, there's more! You still have to add that URL to the app in Gravity so
that OAuth will work:

```sh
$ hokusai staging env get gravity_application_id | cut -d "=" -f 2 | pbcopy
$ cd path/to/gravity
$ hokusai staging run 'bundle exec rails c' --tty"
```

```irb
> volt = ClientApplication.find_by app_id: "abc123"
> volt.redirect_urls << "https://something.us-east-1.elb.amazonaws.com"
> volt.save
```

Now you should be able to load up that URL in your browser, accept the security
warning from Chrome and then use the review app.

Don't forget! If this review app lives beyond a weekend, you'll probably have to
do this in Gravity staging on the next Monday.

## Pushing updated images

Time passes, you get feedback on your PR and you want to update your review app,
no problem, just push a new image to the registry:

```sh
# push the image - this takes a while...stop if it doesn't exit cleanly!
$ hokusai registry push --overwrite --skip-latest --force --tag 1234
# redeploy the review app with the new image
$ hokusai review_app deploy 1234 1234
```

## Cleaning up

What I like to do is have a commit with the YAML for the review app that I keep
rebasing to the end of the commit stack and then when I'm done with the review
app and going to merge the PR it's easy to just remove that commit and merge the
code. Before you do that, run this command to clean up after yourself:

```sh
$ hokusai review_app delete 1234
```
