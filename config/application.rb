require File.expand_path('../boot', __FILE__)

require 'rails/all'

if defined?(Bundler)
  # If you precompile assets before deploying to production, use this line
  Bundler.require(*Rails.groups(:assets => %w(development test)))
  # If you want your assets lazily compiled in production, use this line
  # Bundler.require(:default, :assets, Rails.env)
end

module RdsPrototype
  class Application < Rails::Application
    # Settings in config/environments/* take precedence over those specified here.
    # Application configuration should go into files in config/initializers
    # -- all .rb files in that directory are automatically loaded.

    # Custom directories with classes and modules you want to be autoloadable.
    # config.autoload_paths += %W(#{config.root}/extras)

    # Only load the plugins named here, in the order given (default is alphabetical).
    # :all can be used as a placeholder for all plugins not explicitly named.
    # config.plugins = [ :exception_notification, :ssl_requirement, :all ]

    # Activate observers that should always be running.
    # config.active_record.observers = :cacher, :garbage_collector, :forum_observer

    # Set Time.zone default to the specified zone and make Active Record auto-convert to this zone.
    # Run "rake -D time" for a list of tasks for finding time zone names. Default is UTC.
    # config.time_zone = 'Central Time (US & Canada)'

    # The default locale is :en and all translations from config/locales/*.rb,yml are auto loaded.
    # config.i18n.load_path += Dir[Rails.root.join('my', 'locales', '*.{rb,yml}').to_s]
    # config.i18n.default_locale = :de

    # Configure the default encoding used in templates for Ruby 1.9.
    config.encoding = "utf-8"

    # Configure sensitive parameters which will be filtered from the log file.
    config.filter_parameters += [:password]

    # Enable escaping HTML in JSON.
    config.active_support.escape_html_entities_in_json = true

    # Use SQL instead of Active Record's schema dumper when creating the database.
    # This is necessary if your schema can't be completely dumped by the schema dumper,
    # like if you have constraints or database-specific column types
    # config.active_record.schema_format = :sql

    # Enforce whitelist mode for mass assignment.
    # This will create an empty whitelist of attributes available for mass-assignment for all models
    # in your app. As such, your models will need to explicitly whitelist or blacklist accessible
    # parameters by using an attr_accessible or attr_protected declaration.
    config.active_record.whitelist_attributes = true

    # Enable the asset pipeline
    config.assets.enabled = true

    # Version of your assets, change this if you want to expire all your assets
    config.assets.version = '1.0'






    base_js = %w(
      accounts.js
      advanced_analytics/advanced.js
      advanced_analytics/business.js
      advanced_analytics/channels.js
      advanced_analytics/dashboard.js
      advanced_analytics/campaigns.js
      advanced_analytics/funnel.js
      advanced_analytics/business/planning/load_planning.js
      advanced_analytics/business/planning/edit_planning.js
      advanced_analytics/business/results.js
      advanced_analytics/business/sales_cycle/distribution.js
      advanced_analytics/business/seasons/seasons.js
      advanced_analytics/business/trends.js
      advanced_analytics/business/helpers/business.js
      advanced_analytics/business/helpers/date_helper.js
      advanced_analytics/business/helpers/event_handler_helper.js
      advanced_analytics/channels/results.js
      advanced_analytics/channels/trends.js
      advanced_analytics/channels/seasons/seasons.js
      campaigns/stats.js
      billing.js
      campaigns.js
      company.js
      company/autocomplete.js
      company/merge_company.js
      config.js
      dashboard.js
      dashboard/funnel.js
      docs/api.js
      dynamic_list.js
      dynamic_list/form_handler.js
      email.js
      event_list.js
      funnel/report.js
      import_editor.js
      import_editor/import_csv_s3.js
      keywords.js
      landing_page_form.js
      landing_pages_builder.js
      landing_pages.js
      landing_pages/file_upload.js
      lead_nurturing.js
      lead/autocomplete.js
      lead/change_company.js
      leads_crm.js
      learn.js
      learn.js
      login.js
      on_page_seo_reports.js
      reports.js
      site.js
      social_media_post.js
      socialmedia_monitor.js
      stream_entries.js
      subscription.js
      overview.js
      select_2.js
      select2.js
      dataTables.js
    )
    vendor_js = %w(
       hogan.js
       jquery-colorpicker.js
       /resque/jquery-1.3.2.min.js
       /resque/jquery.relatize_date.js
       /resque/ranger.js
       typeahead.js
       site/respond.min.js
       pace/pace.js
    )
    ie_js = %w( ie.js icons-font/ie7/ie7.js brand-font/ie7/ie7.js )
    base_css = %w(
      accounts.css
      advanced_analytics/advanced.css
      campaigns.css
      dashboard.css
      keywords_panel.css
      landing_pages.css
      lead.css
      lead_nurturing.css
      learn.css
      on_page_seo_reports.css
      outside_app.css
      insights.css
      report.css
      social_media_post.css
      stream_entries.css
      support_tickets.css
      site.css
      blog.css
      dynamic_list.css
      design.css
      email.css
      company.css
      s3_direct_upload_progress_bars.css
      funnel.css
      email-editor.css
      analytics/businnes.css
      empty-index.css
      overview.css
      dataTables.css
      slats.css
    )

    lps_css = Dir["#{config.root}/app/assets/stylesheets/**/form-style.css*"].map { |path| Pathname.new(path).relative_path_from(Pathname.new "#{config.root}/app/assets/stylesheets").to_s.gsub("\.scss","") }

    #FIXME Other css's and vendor css's need to be inclued in base css's
    other_css = %w( share/all.css landing_pages/tinyMCE.css )
    vendor_css = %w( jquery.ui.custom.css jquery-colorpicker.css jquery.action_menu.css /resque/reset.css /resque/style.css brand-font/style.css icons-font/style.css )
    ie_css = %w( ie.css icons-font/ie7/ie7.css brand-font/ie7/ie7.css )

    config.assets.precompile += [ base_js, vendor_js, base_css, lps_css, other_css, vendor_css, ie_css, ie_js].flatten
  end
end
