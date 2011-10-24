require 'active_admin/views/components/popover'

module ActiveAdmin
  module Views
    # Build an ActionListPopover
    class ActionListPopover < ActiveAdmin::Views::Popover
      builder_method :action_list_popover
      
      
      def build(*args, &block)
        @contents = ul :class => "popover_contents"
        
        options = args.extract_options!
        
        super(options)
      end
      
      def action(batch_action, *args)
        options = args.extract_options!
        options[:class] ||= []
        options[:class] += %w(batch_action)
        within @contents do
          li do
            text_node link_to( "%s Selected" % batch_action.title, "#", options.merge( :action => batch_action.sym ) )
          end
        end
      end

    end
  end
end