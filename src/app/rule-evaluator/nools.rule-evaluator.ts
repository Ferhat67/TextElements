import * as nools from 'nools';
import { isEmpty } from 'lodash';
import { RuleEvaluator, ContextParam, AdaptationRule, AdaptationAction, AdaptationController  } from 'cbaui';
import { Injectable } from '@angular/core';

/**
 * This is a wrapper class to use the Nools rule engine for context adaptation purposes.
 */
@Injectable()
export class NoolsRuleEngine extends RuleEvaluator {

  private session: any;
  private flow: any;

  constructor(adaptationController: AdaptationController) {
    super(adaptationController);
  }

  /**
   *
   * @param rules
   * @param contextParams
   * @param adaptation
   */
  public evaluate(rules: AdaptationRule[], contextParams: ContextParam[], adaptation: (action: AdaptationAction) => any) {
    if (!rules || rules.length === 0)
      return;

    // Transform adaptation call from rule to AdaptationAction and execute callback
    const fireAdaptation = function (target, scope, action, params) {
      adaptation({ target, scope, name: action, params });
    };

    // Define a model to work with Context facts in nools rules
    //const noolsContextModel = `define Context { key:"", value:"" } \n`;
    const noolsContextModel = `define Context { user:{}, platform:{}, environment:{} } \n`;

    // Transform Adaptation Rules to nools DSL format
    const noolsRules = noolsContextModel + this.transformRules(rules);

    //console.debug("NoolsRuleEngine: Rules transformed", rules, noolsRules);

    // Build a nools flow from adaptation rules
    this.createFlow(noolsRules, { adaptation: fireAdaptation });

    // Clean up existing session
    if (this.session)
      this.session.dispose();
    // Create a new session from flow
    this.session = this.flow.getSession();
    // Insert facts into the nools session. Facts are context parameters
    const Context = this.flow.getDefined("Context");

    let context = new Context({user:{}, platform:{}, environment:{}});
    Object.values(contextParams).forEach(param => {
      context[param.contextOfUse][param.key] = param.value;
    });
    this.session.assert(context);

    //Object.values(contextParams).forEach(contextParam => this.session.assert(new Context(contextParam)));

    // Workaround for nools to work inside the browser as angular build
    //(window as any).process.nextTick = (params) => setTimeout(params, 0);
    //(window as any).nextTick = (params) => setTimeout(params, 0);
    //this.session.on("fire", (name, rule) => console.debug("Rule " + name + " fired!", rule));

    // finally, start rule evaluation
    this.session.match((err) => {
      if (err) {
        console.error(err.stack);
      }
    });
  }

  /**
   * Create a flow by compiling given rules
   * @param rules
   * @param actions
   */
  public createFlow(rules: string, actions: any) {
    if (this.flow)
      nools.deleteFlow(this.flow.name);

    this.flow = nools.compile(rules, {
      define: {},
      scope: actions,
      name: this.getName()
    });
  }

  /**
   * Transform Adaptation Rule into nools DSL format
   * @param rules
   */
  private transformRules(rules: AdaptationRule[]): string {
    // Transform action
    const transformAction = (action): string => {
      return `adaptation('${action.target}', ${JSON.stringify(action.scope)}, '${action.name}', ${JSON.stringify(action.params)});`;
    }
    // Transform rule
    const transformRule = (rule: AdaptationRule): string => {
      const actions = rule.actions.map(action => transformAction(action)).join(' ');
      return `rule "${rule.name}" { when { c : Context ${rule.condition}; } then { ${actions} }}`
    }
    // Transform rules
    return rules.map(rule => transformRule(rule)).join('\n');
  }

  /** Generate a random but unique name for a flow */
  private getName() {
    let name = 'Flow Name: ' + Math.random();
    while (nools.hasFlow(name)) {
      name = 'Flow Name: ' + Math.random();
    }
    return name;
  }

  /** Clean up nools session and flow, to avoid memory leaks */
  public cleanUp() {
    if (this.session) {
      this.session.dispose();
    }
    if (this.flow) {
      nools.deleteFlow(this.flow.name);
    }
  }
}
