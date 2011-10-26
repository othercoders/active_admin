require 'spec_helper'

describe ActiveAdmin::Resource::BatchActions do

  let(:resource) do
    namespace = ActiveAdmin::Namespace.new(ActiveAdmin::Application.new, :admin)
    namespace.register(Post)
  end
  
  describe "default action should be present" do
    
    it "should have the default action" do
      resource.batch_actions.size.should == 1 and resource.batch_actions.first.sym == :destroy
    end
    
  end
  
  describe "adding a new batch action" do

    before do
      resource.clear_batch_actions!
      resource.add_batch_action :flag, "Flag" do
        # Empty
      end
    end

    it "should add an batch action" do
      resource.batch_actions.size.should == 1
    end

    it "should store an instance of BatchAction" do
      resource.batch_actions.first.should be_an_instance_of(ActiveAdmin::BatchAction)
    end

    it "should store the block in the batch action" do
      resource.batch_actions.first.block.should_not be_nil
    end

  end
  
  describe "removing batch action" do
    
    before do
      resource.remove_batch_action :destroy
    end
    
    it "should allow for batch action removal" do
      resource.batch_actions.size.should == 0
    end
    
  end

end