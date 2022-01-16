<template>
  <form
    action="/fake"
    method="post"
    id="commentform"
    class="form-horizontal"
    action2="https://damiengapp.azurewebsites.net/api/PostComment"
  >
    <fieldset id="commentfields">
      <img
        class="avatar photo"
        id="avatarPreview"
        height="64"
        width="64"
        onerror="setAvatar(this, 1)"
        src="https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&amp;f=y"
      />

      <blockquote>
        <div class="comment-body">
          <textarea
            name="message"
            id="message"
            placeholder="Continue the discussion."
          ></textarea>
        </div>
        <cite>
          <div class="control-group">
            <label for="identity">Avatar <span>(Required)</span></label>
            <input
              type="text"
              id="identity"
              onkeyup="identityChanged()"
              placeholder="email/@twitter/github"
            />
          </div>
        </cite>
        <div class="control-group">
          <label for="name"
            >Name/alias <span>(Required, displayed)</span></label
          >
          <input type="text" name="name" id="name" placeholder="Name" />
        </div>
        <div class="control-group">
          <label for="url">Website <span>(Optional, displayed)</span></label>
          <input
            type="text"
            name="url"
            id="url"
            placeholder="https://mywebsite.com"
          />
        </div>
        <div class="control-group">
          <label>&nbsp;</label>
          <button
            onclick="prepareCommitForm()"
            type="button"
            class="btn"
            id="commentbutton"
          >
            Leave response
          </button>
        </div>
      </blockquote>
      <input type="hidden" name="comment-site" v-bind:value="siteUrl" />
      <input type="hidden" name="redirect" v-bind:value="siteUrl + '/thanks'" />
      <input type="hidden" name="post_id" v-bind:value="pageSlug" />
      <input type="hidden" name="avatar" id="avatar" />
      <div id="commentstatus" style="clear: both" class="status"></div>
    </fieldset>
    <script type="text/javascript" src="/js/comment-new.js"></script>
  </form>
</template>
<script>
export default {
  props: {
    siteUrl: {
      type: String,
      required: true,
    },
    pageSlug: {
      type: String,
      required: true,
    },
  },
};
</script>