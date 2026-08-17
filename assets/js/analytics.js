(function () {
  function loadAnalytics() {
    window.dataLayer = window.dataLayer || [];
    window.gtag =
      window.gtag ||
      function () {
        window.dataLayer.push(arguments);
      };
    window.gtag("js", new Date());
    window.gtag("config", "G-10QE64BG2M", {
      anonymize_ip: true,
      allow_google_signals: false,
      allow_ad_personalization_signals: false,
    });

    const googleTag = document.createElement("script");
    googleTag.async = true;
    googleTag.src = "https://www.googletagmanager.com/gtag/js?id=G-10QE64BG2M";
    document.head.appendChild(googleTag);

    (function (documentObject, posthog) {
      let methodIndex;
      let script;
      let methods;
      let instance;

      if (posthog.__SV) return;

      window.posthog = posthog;
      posthog._i = [];
      posthog.init = function (token, config, name) {
        function addStub(target, method) {
          const parts = method.split(".");
          if (parts.length === 2) {
            target = target[parts[0]];
            method = parts[1];
          }
          target[method] = function () {
            target.push([method].concat(Array.prototype.slice.call(arguments)));
          };
        }

        script = documentObject.createElement("script");
        script.type = "text/javascript";
        script.crossOrigin = "anonymous";
        script.async = true;
        script.src =
          config.api_host.replace(".i.posthog.com", "-assets.i.posthog.com") +
          "/static/array.js";
        documentObject.head.appendChild(script);

        instance = name ? (posthog[name] = []) : posthog;
        instance.people = instance.people || [];
        instance.toString = function (isPeople) {
          let label = "posthog";
          if (name) label += `.${name}`;
          if (!isPeople) label += " (stub)";
          return label;
        };
        instance.people.toString = function () {
          return instance.toString(true) + ".people (stub)";
        };

        methods =
          "init capture register register_once register_for_session unregister unregister_for_session getFeatureFlag getFeatureFlagPayload isFeatureEnabled reloadFeatureFlags updateEarlyAccessFeatureEnrollment getEarlyAccessFeatures on onFeatureFlags onSessionId getSurveys getActiveMatchingSurveys renderSurvey canRenderSurvey getNextSurveyStep identify setPersonProperties group resetGroups setPersonPropertiesForFlags resetPersonPropertiesForFlags setGroupPropertiesForFlags resetGroupPropertiesForFlags reset get_distinct_id getGroups get_session_id get_session_replay_url alias set_config startSessionRecording stopSessionRecording sessionRecordingStarted captureException loadToolbar get_property getSessionProperty createPersonProfile opt_in_capturing opt_out_capturing has_opted_in_capturing has_opted_out_capturing clear_opt_in_out_capturing debug".split(
            " ",
          );
        for (methodIndex = 0; methodIndex < methods.length; methodIndex += 1) {
          addStub(instance, methods[methodIndex]);
        }
        posthog._i.push([token, config, name]);
      };
      posthog.__SV = 1;
    })(document, window.posthog || []);

    window.posthog.init("phc_wyyXUmDa4h7GRYQvboEfkr4XzRUu9ge2HmLgYGKoUVEN", {
      api_host: "https://us.i.posthog.com",
      defaults: "2026-01-30",
    });
  }

  if ("requestIdleCallback" in window) {
    window.requestIdleCallback(loadAnalytics, { timeout: 2000 });
  } else {
    window.addEventListener("load", loadAnalytics, { once: true });
  }
})();
