module ActiveAdmin
  
  class Resource
    module BatchActions
      
      attr_reader :batch_actions
      
      # @return [Array] The set of batch actions for this resource
      def batch_actions
        @batch_actions ||= []
      end
      
      # Add a new batch item to a resource
      # @param [String] title
      # @param [Hash] options
      #
      #
      def add_batch_action(sym, title, options = {}, &block)
        self.batch_actions << ActiveAdmin::BatchAction.new( sym, title, options, &block )
      end
      
      # Clears all the existing batch actions for this resource
      def clear_batch_actions!
        @batch_actions = []
      end
      
      # Path to the batch action itself
      def batch_action_path
        [:batch_action, namespace.name, plural_underscored_resource_name]
      end
      
    end
  end
  
  class BatchAction

    attr_reader :block, :title, :sym

    # Create a Batch Action
    #
    # Examples:
    #
    #   BatchAction.new :flag 
    # => Will create an action that appears in the action list popover
    #
    #   BatchAction.new( :flag ) { |selection| redirect_to collection_path, :notice => "#{selection.length} users flagged" }
    # => Will create an action that uses a block to process the request (which receives one paramater of the selected objects) 
    #
    #   BatchAction.new( "Perform Long Operation on the" ) { |selection| }
    # => You can create batch actions with a title instead of a Symbol
    #
    #   BatchAction.new( :flag, :if => proc { can? :flag, AdminUser  } ) { |selection| }
    # => You can provide an optional :if proc to optionally display the batch action
    #
    def initialize(sym, title, options = {}, &block)
      @sym, @title, @options, @block = sym, title, options, block
      @block ||= proc {}
    end
    
    # Returns the display if block. If the block was not explicitly defined
    # a default block always returning true will be returned.
    def display_if_block
      @options[:if] || proc { true }
    end

  end
  
end