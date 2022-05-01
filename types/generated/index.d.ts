import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { Context } from '@the-devoyage/micro-auth-helpers';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
  ObjectID: any;
  _Any: any;
};

export type Account = {
  __typename?: 'Account';
  _id: Scalars['ObjectID'];
  email: Scalars['String'];
  users: GetUsersResponse;
};


export type AccountUsersArgs = {
  getUsersInput: GetUsersInput;
};

export type Address = {
  __typename?: 'Address';
  city: Scalars['String'];
  lineOne: Scalars['String'];
  lineTwo?: Maybe<Scalars['String']>;
  state: Scalars['String'];
  zip: Scalars['String'];
};

export type AddressInput = {
  city: Scalars['String'];
  lineOne: Scalars['String'];
  lineTwo?: InputMaybe<Scalars['String']>;
  state: Scalars['String'];
  zip: Scalars['String'];
};

export enum ArrayFilterByEnum {
  In = 'IN',
  Nin = 'NIN'
}

/** Filter for documents which have a property that is a Boolean. */
export type BooleanFieldFilter = {
  bool: Scalars['Boolean'];
  filterBy: BooleanFilterByEnum;
  groups?: InputMaybe<Array<Scalars['String']>>;
  operator?: InputMaybe<OperatorFieldConfigEnum>;
};

/** Equal or Not Equal */
export enum BooleanFilterByEnum {
  Eq = 'EQ',
  Ne = 'NE'
}

/** Filter for documents which have a property that is a Date. */
export type DateFieldFilter = {
  date: Scalars['DateTime'];
  filterBy: DateFilterByEnum;
  groups?: InputMaybe<Array<Scalars['String']>>;
  operator?: InputMaybe<OperatorFieldConfigEnum>;
};

export enum DateFilterByEnum {
  Eq = 'EQ',
  Gt = 'GT',
  Gte = 'GTE',
  Lt = 'LT',
  Lte = 'LTE',
  Ne = 'NE'
}

export type DeleteUserInput = {
  _id: Scalars['ObjectID'];
};

/** Global configuration details. */
export type FilterConfig = {
  pagination?: InputMaybe<Pagination>;
};

export type GetUserByMembershipInput = {
  _id?: InputMaybe<StringFieldFilter>;
  account?: InputMaybe<StringFieldFilter>;
  createdAt?: InputMaybe<DateFieldFilter>;
  role?: InputMaybe<Array<InputMaybe<IntFieldFilter>>>;
  status?: InputMaybe<Array<InputMaybe<StringFieldFilter>>>;
  updatedAt?: InputMaybe<DateFieldFilter>;
};

export type GetUsersInput = {
  _id?: InputMaybe<Array<InputMaybe<StringFieldFilter>>>;
  config?: InputMaybe<FilterConfig>;
  createdAt?: InputMaybe<Array<InputMaybe<DateFieldFilter>>>;
  created_by?: InputMaybe<Array<InputMaybe<StringFieldFilter>>>;
  email?: InputMaybe<Array<InputMaybe<StringFieldFilter>>>;
  first_name?: InputMaybe<Array<InputMaybe<StringFieldFilter>>>;
  image?: InputMaybe<Array<InputMaybe<StringFieldFilter>>>;
  last_name?: InputMaybe<Array<InputMaybe<StringFieldFilter>>>;
  memberships?: InputMaybe<Array<InputMaybe<GetUserByMembershipInput>>>;
  phone?: InputMaybe<Array<InputMaybe<StringFieldFilter>>>;
  updatedAt?: InputMaybe<Array<InputMaybe<DateFieldFilter>>>;
};

export type GetUsersResponse = {
  __typename?: 'GetUsersResponse';
  data: Array<User>;
  stats: Stats;
};

/** Filter for documents which have a property that is an Integer. */
export type IntFieldFilter = {
  filterBy: IntFilterByEnum;
  groups?: InputMaybe<Array<Scalars['String']>>;
  int: Scalars['Int'];
  operator?: InputMaybe<OperatorFieldConfigEnum>;
};

export enum IntFilterByEnum {
  Eq = 'EQ',
  Gt = 'GT',
  Gte = 'GTE',
  Lt = 'LT',
  Lte = 'LTE',
  Ne = 'NE'
}

export type InviteUserInput = {
  email: Scalars['String'];
  local?: InputMaybe<LocalMembershipInput>;
  role?: InputMaybe<Scalars['Int']>;
};

export type LocalMembershipInput = {
  about?: InputMaybe<Scalars['String']>;
  address?: InputMaybe<AddressInput>;
  first_name?: InputMaybe<Scalars['String']>;
  image?: InputMaybe<Scalars['ObjectID']>;
  last_name?: InputMaybe<Scalars['String']>;
  phone?: InputMaybe<Scalars['String']>;
};

export type LocalUserDetails = {
  __typename?: 'LocalUserDetails';
  about?: Maybe<Scalars['String']>;
  address?: Maybe<Address>;
  first_name?: Maybe<Scalars['String']>;
  image?: Maybe<Media>;
  last_name?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
};

export type LoginUserResponse = {
  __typename?: 'LoginUserResponse';
  token: Scalars['String'];
  user: User;
};

export type Media = {
  __typename?: 'Media';
  _id: Scalars['ObjectID'];
};

export type Membership = {
  __typename?: 'Membership';
  _id: Scalars['ObjectID'];
  account: Account;
  createdAt: Scalars['DateTime'];
  created_by: User;
  default: Scalars['Boolean'];
  local?: Maybe<LocalUserDetails>;
  role: Scalars['Int'];
  status?: Maybe<MembershipStatusEnum>;
  updatedAt: Scalars['DateTime'];
};

export type MembershipInput = {
  account: Scalars['ObjectID'];
  default?: InputMaybe<Scalars['Boolean']>;
  local?: InputMaybe<LocalMembershipInput>;
  role?: InputMaybe<Scalars['Int']>;
  status?: InputMaybe<MembershipStatusEnum>;
};

export enum MembershipStatusEnum {
  Active = 'ACTIVE',
  Inactive = 'INACTIVE',
  Pending = 'PENDING',
  Revoked = 'REVOKED'
}

export type Mutation = {
  __typename?: 'Mutation';
  deleteUser: User;
  inviteUser: User;
  loginUser: LoginUserResponse;
  switchUserMembership: LoginUserResponse;
  updateUser: User;
};


export type MutationDeleteUserArgs = {
  deleteUserInput: DeleteUserInput;
};


export type MutationInviteUserArgs = {
  inviteUserInput: InviteUserInput;
};


export type MutationSwitchUserMembershipArgs = {
  switchUserMembershipInput: SwitchUserMembershipInput;
};


export type MutationUpdateUserArgs = {
  updateUserInput: UpdateUserInput;
};

export enum OperatorFieldConfigEnum {
  And = 'AND',
  Or = 'OR'
}

export type Pagination = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  limit?: InputMaybe<Scalars['Int']>;
  reverse?: InputMaybe<Scalars['Boolean']>;
};

export type Query = {
  __typename?: 'Query';
  getUsers: GetUsersResponse;
  me: User;
};


export type QueryGetUsersArgs = {
  getUsersInput: GetUsersInput;
};

export type Stats = {
  __typename?: 'Stats';
  cursor?: Maybe<Scalars['DateTime']>;
  page?: Maybe<Scalars['Int']>;
  remaining?: Maybe<Scalars['Int']>;
  total?: Maybe<Scalars['Int']>;
};

/** Filter for documents which have a property that is an array of strings.. */
export type StringArrayFieldFilter = {
  arrayOptions: ArrayFilterByEnum;
  filterBy: StringFilterByEnum;
  groups?: InputMaybe<Array<Scalars['String']>>;
  operator?: InputMaybe<OperatorFieldConfigEnum>;
  string: Array<Scalars['String']>;
};

/** Filter for documents which have a property that is a string. Filter by REGEX, ObjectID, or Match. */
export type StringFieldFilter = {
  filterBy: StringFilterByEnum;
  groups?: InputMaybe<Array<Scalars['String']>>;
  operator?: InputMaybe<OperatorFieldConfigEnum>;
  string: Scalars['String'];
};

export enum StringFilterByEnum {
  Match = 'MATCH',
  Objectid = 'OBJECTID',
  Regex = 'REGEX'
}

export type SwitchUserMembershipInput = {
  membership_id: Scalars['ObjectID'];
};

export type UpdateUserInput = {
  about?: InputMaybe<Scalars['String']>;
  address?: InputMaybe<AddressInput>;
  email?: InputMaybe<Scalars['String']>;
  first_name?: InputMaybe<Scalars['String']>;
  image?: InputMaybe<Scalars['ObjectID']>;
  last_name?: InputMaybe<Scalars['String']>;
  memberships?: InputMaybe<MembershipInput>;
  phone?: InputMaybe<Scalars['String']>;
  user: GetUsersInput;
};

export type User = {
  __typename?: 'User';
  _id: Scalars['ObjectID'];
  about?: Maybe<Scalars['String']>;
  address?: Maybe<Address>;
  createdAt: Scalars['DateTime'];
  created_by?: Maybe<User>;
  email: Scalars['String'];
  first_name?: Maybe<Scalars['String']>;
  image?: Maybe<Media>;
  last_name?: Maybe<Scalars['String']>;
  memberships: Array<Membership>;
  phone?: Maybe<Scalars['String']>;
  updatedAt: Scalars['DateTime'];
};

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  Account: ResolverTypeWrapper<Account>;
  Address: ResolverTypeWrapper<Address>;
  AddressInput: AddressInput;
  ArrayFilterByEnum: ArrayFilterByEnum;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  BooleanFieldFilter: BooleanFieldFilter;
  BooleanFilterByEnum: BooleanFilterByEnum;
  DateFieldFilter: DateFieldFilter;
  DateFilterByEnum: DateFilterByEnum;
  DateTime: ResolverTypeWrapper<Scalars['DateTime']>;
  DeleteUserInput: DeleteUserInput;
  FilterConfig: FilterConfig;
  GetUserByMembershipInput: GetUserByMembershipInput;
  GetUsersInput: GetUsersInput;
  GetUsersResponse: ResolverTypeWrapper<GetUsersResponse>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  IntFieldFilter: IntFieldFilter;
  IntFilterByEnum: IntFilterByEnum;
  InviteUserInput: InviteUserInput;
  LocalMembershipInput: LocalMembershipInput;
  LocalUserDetails: ResolverTypeWrapper<LocalUserDetails>;
  LoginUserResponse: ResolverTypeWrapper<LoginUserResponse>;
  Media: ResolverTypeWrapper<Media>;
  Membership: ResolverTypeWrapper<Membership>;
  MembershipInput: MembershipInput;
  MembershipStatusEnum: MembershipStatusEnum;
  Mutation: ResolverTypeWrapper<{}>;
  ObjectID: ResolverTypeWrapper<Scalars['ObjectID']>;
  OperatorFieldConfigEnum: OperatorFieldConfigEnum;
  Pagination: Pagination;
  Query: ResolverTypeWrapper<{}>;
  Stats: ResolverTypeWrapper<Stats>;
  String: ResolverTypeWrapper<Scalars['String']>;
  StringArrayFieldFilter: StringArrayFieldFilter;
  StringFieldFilter: StringFieldFilter;
  StringFilterByEnum: StringFilterByEnum;
  SwitchUserMembershipInput: SwitchUserMembershipInput;
  UpdateUserInput: UpdateUserInput;
  User: ResolverTypeWrapper<User>;
  _Any: ResolverTypeWrapper<Scalars['_Any']>;
  _Entity: ResolversTypes['Account'] | ResolversTypes['Media'] | ResolversTypes['User'];
  _Service: ResolverTypeWrapper<_Service>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Account: Account;
  Address: Address;
  AddressInput: AddressInput;
  Boolean: Scalars['Boolean'];
  BooleanFieldFilter: BooleanFieldFilter;
  DateFieldFilter: DateFieldFilter;
  DateTime: Scalars['DateTime'];
  DeleteUserInput: DeleteUserInput;
  FilterConfig: FilterConfig;
  GetUserByMembershipInput: GetUserByMembershipInput;
  GetUsersInput: GetUsersInput;
  GetUsersResponse: GetUsersResponse;
  Int: Scalars['Int'];
  IntFieldFilter: IntFieldFilter;
  InviteUserInput: InviteUserInput;
  LocalMembershipInput: LocalMembershipInput;
  LocalUserDetails: LocalUserDetails;
  LoginUserResponse: LoginUserResponse;
  Media: Media;
  Membership: Membership;
  MembershipInput: MembershipInput;
  Mutation: {};
  ObjectID: Scalars['ObjectID'];
  Pagination: Pagination;
  Query: {};
  Stats: Stats;
  String: Scalars['String'];
  StringArrayFieldFilter: StringArrayFieldFilter;
  StringFieldFilter: StringFieldFilter;
  SwitchUserMembershipInput: SwitchUserMembershipInput;
  UpdateUserInput: UpdateUserInput;
  User: User;
  _Any: Scalars['_Any'];
  _Entity: ResolversParentTypes['Account'] | ResolversParentTypes['Media'] | ResolversParentTypes['User'];
  _Service: _Service;
}>;

export type ExtendsDirectiveArgs = { };

export type ExtendsDirectiveResolver<Result, Parent, ContextType = Context, Args = ExtendsDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type AccountResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Account'] = ResolversParentTypes['Account']> = ResolversObject<{
  _id?: Resolver<ResolversTypes['ObjectID'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  users?: Resolver<ResolversTypes['GetUsersResponse'], ParentType, ContextType, RequireFields<AccountUsersArgs, 'getUsersInput'>>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type AddressResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Address'] = ResolversParentTypes['Address']> = ResolversObject<{
  city?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  lineOne?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  lineTwo?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  state?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  zip?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime';
}

export type GetUsersResponseResolvers<ContextType = Context, ParentType extends ResolversParentTypes['GetUsersResponse'] = ResolversParentTypes['GetUsersResponse']> = ResolversObject<{
  data?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType>;
  stats?: Resolver<ResolversTypes['Stats'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type LocalUserDetailsResolvers<ContextType = Context, ParentType extends ResolversParentTypes['LocalUserDetails'] = ResolversParentTypes['LocalUserDetails']> = ResolversObject<{
  about?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  address?: Resolver<Maybe<ResolversTypes['Address']>, ParentType, ContextType>;
  first_name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  image?: Resolver<Maybe<ResolversTypes['Media']>, ParentType, ContextType>;
  last_name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  phone?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type LoginUserResponseResolvers<ContextType = Context, ParentType extends ResolversParentTypes['LoginUserResponse'] = ResolversParentTypes['LoginUserResponse']> = ResolversObject<{
  token?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MediaResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Media'] = ResolversParentTypes['Media']> = ResolversObject<{
  _id?: Resolver<ResolversTypes['ObjectID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MembershipResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Membership'] = ResolversParentTypes['Membership']> = ResolversObject<{
  _id?: Resolver<ResolversTypes['ObjectID'], ParentType, ContextType>;
  account?: Resolver<ResolversTypes['Account'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  created_by?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  default?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  local?: Resolver<Maybe<ResolversTypes['LocalUserDetails']>, ParentType, ContextType>;
  role?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['MembershipStatusEnum']>, ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MutationResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  deleteUser?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationDeleteUserArgs, 'deleteUserInput'>>;
  inviteUser?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationInviteUserArgs, 'inviteUserInput'>>;
  loginUser?: Resolver<ResolversTypes['LoginUserResponse'], ParentType, ContextType>;
  switchUserMembership?: Resolver<ResolversTypes['LoginUserResponse'], ParentType, ContextType, RequireFields<MutationSwitchUserMembershipArgs, 'switchUserMembershipInput'>>;
  updateUser?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationUpdateUserArgs, 'updateUserInput'>>;
}>;

export interface ObjectIdScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['ObjectID'], any> {
  name: 'ObjectID';
}

export type QueryResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  _entities?: Resolver<Array<Maybe<ResolversTypes['_Entity']>>, ParentType, ContextType, RequireFields<Query_EntitiesArgs, 'representations'>>;
  _service?: Resolver<ResolversTypes['_Service'], ParentType, ContextType>;
  getUsers?: Resolver<ResolversTypes['GetUsersResponse'], ParentType, ContextType, RequireFields<QueryGetUsersArgs, 'getUsersInput'>>;
  me?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
}>;

export type StatsResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Stats'] = ResolversParentTypes['Stats']> = ResolversObject<{
  cursor?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  page?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  remaining?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  total?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type UserResolvers<ContextType = Context, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = ResolversObject<{
  _id?: Resolver<ResolversTypes['ObjectID'], ParentType, ContextType>;
  about?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  address?: Resolver<Maybe<ResolversTypes['Address']>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  created_by?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  first_name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  image?: Resolver<Maybe<ResolversTypes['Media']>, ParentType, ContextType>;
  last_name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  memberships?: Resolver<Array<ResolversTypes['Membership']>, ParentType, ContextType>;
  phone?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface _AnyScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['_Any'], any> {
  name: '_Any';
}

export type _EntityResolvers<ContextType = Context, ParentType extends ResolversParentTypes['_Entity'] = ResolversParentTypes['_Entity']> = ResolversObject<{
  __resolveType: TypeResolveFn<'Account' | 'Media' | 'User', ParentType, ContextType>;
}>;

export type _ServiceResolvers<ContextType = Context, ParentType extends ResolversParentTypes['_Service'] = ResolversParentTypes['_Service']> = ResolversObject<{
  sdl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Resolvers<ContextType = Context> = ResolversObject<{
  Account?: AccountResolvers<ContextType>;
  Address?: AddressResolvers<ContextType>;
  DateTime?: GraphQLScalarType;
  GetUsersResponse?: GetUsersResponseResolvers<ContextType>;
  LocalUserDetails?: LocalUserDetailsResolvers<ContextType>;
  LoginUserResponse?: LoginUserResponseResolvers<ContextType>;
  Media?: MediaResolvers<ContextType>;
  Membership?: MembershipResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  ObjectID?: GraphQLScalarType;
  Query?: QueryResolvers<ContextType>;
  Stats?: StatsResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  _Any?: GraphQLScalarType;
  _Entity?: _EntityResolvers<ContextType>;
  _Service?: _ServiceResolvers<ContextType>;
}>;

export type DirectiveResolvers<ContextType = Context> = ResolversObject<{
  extends?: ExtendsDirectiveResolver<any, any, ContextType>;
}>;
