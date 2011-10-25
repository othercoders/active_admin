# Customizing the Index Page

Filtering and listing resources is one of the most important tasks for
administering a web application. Active Admin provides many different tools for
you to build a compelling interface into your data for the admin staff.

Built in, Active Admin has the following index renderers:

* *Table*: A table drawn with each row being a resource ([View Table Docs](3-index-pages/index-as-table.md))
* *Grid*: A set of rows and columns each cell being a resource ([View Grid Docs](3-index-pages/index-as-grid.md))
* *Blocks*: A set of rows (not tabular) each row being a resource ([View Blocks Docs](3-index-pages/index-as-block.md))
* *Blog*: A title and body content, similar to a blog index ([View Blog Docs](3-index-pages/index-as-blog.md))

All index pages also support scopes, filters, pagination, action items, and
sidebar sections.

## Index Filters

By default the index screen includes a "Filters" sidebar on the right hand side
with a filter for each attribute of the registered model. You can customize the
filters that are displayed as well as the type of widgets they use.

To display a filter for an attribute, use the filter method

    ActiveAdmin.register Post do
      filter :title
    end

Out of the box, Active Admin supports the following filter types:

* *:string* - A search field
* *:date_range* - A start and end date field with calendar inputs
* *:numeric* - A drop down for selecting "Equal To", "Greater Than" or "Less
  Than" and an input for a value.
* *:select* - A drop down which filters based on a selected item in a collection
  or all.
* *:check_boxes* - A list of check boxes users can turn on and off to filter

By default, Active Admin will pick the most relevant filter based on the
attribute type. You can force the type by passing the :as option.

    filter :author, :as => :check_boxes

The :check_boxes and :select types accept options for the collection. By default
it attempts to create a collection based on an association. But you can pass in
the collection as a proc to be called at render time.

    # Will call available
    filter :author, :as => :check_boxes, :collection => proc { Author.all }

You can change the filter label by passing a label option:

    filter :author, :label => 'Author'

By default, Active Admin will try to use ActiveModel I18n to determine the label.

## Batch Actions

By default, the *Table* index view includes a way to quickly delete records from the listing,
as well as an API for you to easily create your own "Batch Action" for handling a request to operate
on multiple records at once.

To create your own batch action, use the batch_action method

	ActiveAdmin.register Post do
	  batch_action :flag, :if => proc { can?( :flag, Post ) } do |selection|
	    selection.each do |post|
	      post.flag! :hot
	    end
	  end
	end
	
If you wanted to modify the behavior of the provided "Delete" batch action, you can override by

	ActiveAdmin.register Post do
	  batch_action :destroy, :if => proc { can?( :destroy, Post ) } do |selection|
	    redirect_to collection_path, :alert => "Didn't really delete these!"
	  end
	end
	
You can also remove batch actions by simply passing false as the second parameter

	ActiveAdmin.register Post do
	  batch_action :destroy, false
	end
	
You can also change the order of batch actions, by providing a value for the :sort_order param

	ActiveAdmin.register Post do
	  batch_action :destroy, :sort_order => 1 do |selection|
	    selection.each { |r| r.destroy }
	    redirect_to collection_path, :notice => "#{selection.length} #{selection.length == 1 ? active_admin_config.resource_name : active_admin_config.plural_resource_name} Deleted"
	  end
	end
	
You can also request that the user confirm the action, before the action is performed

	ActiveAdmin.register Post do
	  batch_action :destroy, :confirm => "Are you sure you want to delete all of these?" do |selection|
	    selection.each { |r| r.destroy }
	    redirect_to collection_path, :notice => "#{selection.length} #{selection.length == 1 ? active_admin_config.resource_name : active_admin_config.plural_resource_name} Deleted"
	  end
	end