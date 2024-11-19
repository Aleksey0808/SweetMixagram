import ExpoModulesCore
  import AdServices

  public class MyModule: Module {
    public func definition() -> ModuleDefinition {
      Name("MyModule")

      Constants([
        "PI": Double.pi
      ])

      Events("onChange")

      Function("hello") { () -> [String: Any] in
        do {
          let token = try self.getAttributionToken()
          return ["status": true, "token": token]
        } catch {
          return ["status": false, "errorMessage": error.localizedDescription]
        }
      }

      AsyncFunction("setValueAsync") { (value: String) in
        self.sendEvent("onChange", [
          "value": value
        ])
      }

      View(MyModuleView.self) {
        Prop("name") { (view: MyModuleView, prop: String) in
          print(prop)
        }
      }
    }

    private func getAttributionToken() throws -> String {
      if #available(iOS 14.3, *) {
        do {
          let token = try AAAttribution.attributionToken()
          return token
        } catch {
          throw NSError(domain: "MyModule", code: 1, userInfo: [NSLocalizedDescriptionKey: "Failed to get attribution token"])
        }
      } else {
        throw NSError(domain: "MyModule", code: 1, userInfo: [NSLocalizedDescriptionKey: "iOS version is not supported"])
      }
    }
  }
